import { Controller, Get, UseGuards, Req, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGoogleGuard } from './guard/google.guard';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ReqUser } from './decorators/req-user.decorator';
import { UserJwtGuard } from './guard/jwt.guard';
import { IJwtUser, JwtUser } from './decorators/jwt-user.decorator';
import { WelcomeFlowDTO } from './dtos/welcome-flow.dto';
import { Request, Response } from 'express';

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
  async signInWithGoogleCallback(@ReqUser() user: any, @Res() res: Response) {
    const user_id = randomUUID();
    const dto: CreateUserDTO = {
      id: user_id,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      image_url: user.picture,
    };
    const { access_token } = await this.userService.signInWithGoogle(dto);

    res.cookie('access_token', access_token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
    });

    return res.redirect(`${process.env.FRONTEND_URL}`);
  }

  @Get('information')
  @UseGuards(UserJwtGuard)
  getUser(@JwtUser() user: IJwtUser) {
    return this.userService.getUser(user.id);
  }

  @Post('welcome')
  @UseGuards(UserJwtGuard)
  welcomeFlow(@JwtUser() user: IJwtUser, @Req() req: Request) {
    const dto: WelcomeFlowDTO = { id: user.id, ...req.body };

    return this.userService.welcomeFlow(dto);
  }

  @Get('/membership')
  @UseGuards(UserJwtGuard)
  getMemberships(@JwtUser() user: IJwtUser) {
    return this.userService.getMemberships(user.id);
  }

  @Get('/company')
  @UseGuards(UserJwtGuard)
  getCompanies(@JwtUser() user: IJwtUser) {
    return this.userService.getCompanies(user.id);
  }

  @Post('/company/create')
  @UseGuards(UserJwtGuard)
  createCompany(@JwtUser() user: IJwtUser, @Req() req: Request) {
    const company_id = randomUUID();

    return this.userService.createCompany({ user_id: user.id, id: company_id, ...req.body });
  }

  @Post('/company/member/token/create')
  @UseGuards(UserJwtGuard)
  createMemberAccessToken(@JwtUser() user: IJwtUser, @Req() req: Request) {
    return this.userService.createMemberAccessToken({ user_id: user.id, company_id: req.body.company_id });
  }
}
