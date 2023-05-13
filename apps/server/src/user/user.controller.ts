import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGoogleGuard } from './guard/google.guard';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ReqUser } from './decorators/req-user.decorator';
import { UserJwtGuard } from './guard/jwt.guard';
import { IJwtUser, JwtUser } from './decorators/jwt-user.decorator';
import { WelcomeFlowDTO } from './dtos/welcome-flow.dto';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/auth/google/authorize')
  @UseGuards(UserGoogleGuard)
  signInWithGoogle() {
    return;
  }

  @Get('/auth/google/callback')
  @UseGuards(UserGoogleGuard)
  async signInWithGoogleCallback(@ReqUser() user: any) {
    const user_id = randomUUID();
    const dto: CreateUserDTO = {
      id: user_id,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      image_url: user.picture,
    };
    const { access_token } = await this.userService.signInWithGoogle(dto);
    return { data: { access_token } };
  }

  @Post('/welcome')
  @UseGuards(UserJwtGuard)
  welcomeFlow(@JwtUser() user: IJwtUser, @Req() req: Request) {
    const dto: WelcomeFlowDTO = { id: user.id, ...req.body };

    return this.userService.welcomeFlow(dto);
  }
}
