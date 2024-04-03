import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AppUserService } from 'src/app-user/app-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private configService: ConfigService) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ignoreExpiration: false,
  //     secretOrKey: configService.get<string>('JWT_SECRET'),
  //   });
  // }

  constructor(
    private configService: ConfigService,
    private readonly appUserService: AppUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.authCookie;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.appUserService.findOne(payload.id);

    const userResponse = {
      ...user,
      access_hash: undefined,
      access_name: undefined,
      hash: undefined,
      person: undefined,
      id: undefined,
      probando: 'Probando',
    };
    return userResponse; // ! No entiendo porque esto devuelve el objeto user reducido con las propiedades seguras de mostrar si estoy cargando la entidad completa
    // return {
    //   userId: payload.id,
    //   username: payload.userName,
    //   fullName: payload.fullName,
    // };
  }
}
