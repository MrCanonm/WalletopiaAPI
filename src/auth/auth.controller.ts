import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const { user, cookieOptions } = await this.authService.logIn(loginAuthDto);
    // Set the cookie
    response.cookie('authCookie', user.token, cookieOptions);

    return response.json(user);
  }
}
