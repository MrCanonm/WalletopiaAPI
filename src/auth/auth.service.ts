import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppUser } from 'src/app-user/entities/app-user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/create-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUser)
    private readonly appUserRepo: Repository<AppUser>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  resourceUsing = 'Usuario';

  async logIn(loginAuthDto: LoginAuthDto) {
    const { userNameOrEmail, password } = loginAuthDto;

    const existingUser = await this.appUserRepo.findOne({
      where: [{ access_name: userNameOrEmail }, { email: userNameOrEmail }],
    });
    if (!existingUser) {
      throw new UnauthorizedException(
        `${this.resourceUsing} ${userNameOrEmail} y/o contraseña incorrectos`,
      );
    }
    const validPassword = await compare(password, existingUser.access_hash);

    if (!validPassword) {
      throw new UnauthorizedException(
        `${this.resourceUsing} ${userNameOrEmail} y/o contraseña incorrectos`,
      );
    }

    const nameFull = existingUser.full_name;
    const jwtPayload = {
      id: existingUser.id,
      userName: userNameOrEmail,
      fullName: nameFull,
    };
    const token = this.jwtService.sign(jwtPayload);

    const cookieExpirationTime = this.configService.get<number>(
      'COOKIE_EXPIRATION_TIME',
    );
    const cookieExpirationInMilliseconds = cookieExpirationTime * 60 * 1000;

    const cookieExpiration = new Date(
      Date.now() + cookieExpirationInMilliseconds,
    );

    const cookieOptions = {
      expires: cookieExpiration,
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict' as 'strict' | 'lax' | 'none',
      path: '/',
    };

    // set last login to current date time
    const lastLogin = new Date();
    await this.appUserRepo.update(existingUser.id, { last_login: lastLogin });

    const personResponse = {
      fullName: existingUser.full_name,
    };

    const userResponse = {
      userName: existingUser.access_name,
      email: existingUser.email,
      last_login: lastLogin,
      people: personResponse,
      token,
    };

    return { user: userResponse, cookieOptions };
  }
}
