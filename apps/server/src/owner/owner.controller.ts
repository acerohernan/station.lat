import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { ReqUser } from 'src/shared/decorators/req-user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { IJwtOwner, JwtOwner } from './decorators/jwt-owner.decorator';
import { Request } from 'express';
import { GoogleOAuthGuard } from 'src/shared/guards/google.guard';

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

  @Post('/welcome')
  @UseGuards(JwtGuard)
  iam(@JwtOwner() owner: IJwtOwner, @Req() req: Request) {
    return this.ownerService.welcomeFlow({
      owner_id: owner.id,
      ...req.body,
    });
  }
}
