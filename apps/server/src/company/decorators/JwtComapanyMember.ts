import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtCompanyMember {
  user_id: string;
  company_id: string;
  role: string;
}

export const JwtCompanyMember = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    user_id: request.user.sub,
    company_id: request.user.company_id,
    role: request.user.role,
  } as IJwtCompanyMember;
});
