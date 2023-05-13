import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtUser {
  id: string;
  email: string;
}

export const JwtUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return { id: request.user.sub, email: request.user.email } as IJwtUser;
});
