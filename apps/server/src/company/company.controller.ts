import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GoogleOAuthGuard } from 'src/shared/guards/google.guard';
import { ReqUser } from 'src/shared/decorators/req-user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/auth/google/authorize')
  @UseGuards(GoogleOAuthGuard)
  signInWithGoogle() {
    return;
  }

  @Get('/auth/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@ReqUser() user: any) {
    return user;
  }
}
