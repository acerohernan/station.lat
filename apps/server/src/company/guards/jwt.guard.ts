import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { createVerifier } from 'fast-jwt';

@Injectable()
export class CompanyJwtGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const bearer_token: string = req.headers['authorization'];

    if (!bearer_token) return false;

    const access_token = bearer_token.split(' ')[1];

    if (!access_token) return false;

    const verify = createVerifier({ key: process.env.JWT_COMPANY_SECRET });

    try {
      const payload = verify(access_token);
      {
        req.user = payload;

        return true;
      }
    } catch (err) {
      return false;
    }
  }
}
