import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtOwner {
  id: string;
  email: string;
}

export const JwtOwner = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IJwtOwner;
});
