import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtCompanyMember {
  id: string;
}

export const JwtCompanyMember = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    id: request.user.sub,
  } as IJwtCompanyMember;
});
