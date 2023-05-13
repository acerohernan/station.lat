import { AuthGuard } from '@nestjs/passport';

export class UserGoogleGuard extends AuthGuard('google-user') {
  constructor() {
    super();
  }
}
