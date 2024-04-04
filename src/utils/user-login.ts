import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorador para obtener los datos del usuario actual logeado
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
