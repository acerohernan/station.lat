import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { createVerifier } from 'fast-jwt';
import { Request } from 'express';

@Injectable()
export class UserJwtGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const access_token: string = req.cookies['access_token'];

    if (!access_token) return false;

    const verify = createVerifier({ key: process.env.JWT_USER_SECRET });

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
