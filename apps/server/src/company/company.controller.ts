import { Controller, Get, Post, UseGuards, Req, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyJwtGuard } from './guards/jwt.guard';
import { IJwtCompanyMember, JwtCompanyMember } from './decorators/JwtComapanyMember';
import { Request } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /* All members routes */
  @Get('information')
  @UseGuards(CompanyJwtGuard)
  getInformation(@JwtCompanyMember() member: IJwtCompanyMember) {
    return this.companyService.getCompany(member.id);
  }

  /* Admin routes */
  @Get('admin/member')
  @UseGuards(CompanyJwtGuard)
  getCompanyMembers(@JwtCompanyMember() member: IJwtCompanyMember) {
    return this.companyService.adminGetCompanyMembers(member.id);
  }

  @Post('admin/member')
  @UseGuards(CompanyJwtGuard)
  createCompanyMember(@JwtCompanyMember() member: IJwtCompanyMember, @Req() req: Request) {
    return this.companyService.adminCreateCompanyMember({ admin_member_id: member.id, ...req.body });
  }

  @Put('admin/member/role')
  @UseGuards(CompanyJwtGuard)
  adminChangeMemberRole(@JwtCompanyMember() member: IJwtCompanyMember, @Req() req: Request) {
    return this.companyService.adminCreateCompanyMember({ admin_member_id: member.id, ...req.body });
  }
  /* Admin and editor routes */
}
