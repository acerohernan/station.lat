import { Controller, Get, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from './guards/google.guard';
import { randomUUID } from 'crypto';
import { ReqUser } from 'src/shared/decorators/req-user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { IJwtOwner, JwtOwner } from './decorators/jwt-owner.decorator';

@ApiTags('owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get('/auth/google/authorize')
  @UseGuards(GoogleOAuthGuard)
  signInWithGoogle() {
    return;
  }

  @Get('/auth/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@ReqUser() user: any) {
    const owner_id = randomUUID();

    const { access_token } = await this.ownerService.signInWithGoogle({
      id: owner_id,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      image: user.picture,
    });

    return { data: { access_token } };
  }

  @Get('/iam')
  @UseGuards(JwtGuard)
  iam(@JwtOwner() owner: IJwtOwner) {
    return owner;
  }
}
