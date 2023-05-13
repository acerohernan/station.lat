import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyJwtGuard } from './guards/jwt.guard';
import { IJwtCompanyMember, JwtCompanyMember } from './decorators/JwtComapanyMember';
import { MemberRole } from './entities/member.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /* All members routes */
  @Get('information')
  @UseGuards(CompanyJwtGuard)
  getInformation(@JwtCompanyMember() member: IJwtCompanyMember) {
    return this.companyService.getCompany(member.company_id);
  }

  /* Admin routes */
  @Get('admin/member')
  @UseGuards(CompanyJwtGuard)
  getCompanyMembers(@JwtCompanyMember() member: IJwtCompanyMember) {
    return this.companyService.getCompanyMembers({ company_id: member.company_id, role: member.role as MemberRole });
  }
  /* Admin and editor routes */
}
