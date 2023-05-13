import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CompanyRepository } from './repositories/company.repository';
import { MemberRepository } from './repositories/member.repository';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, MemberRepository],
  imports: [SharedModule],
  exports: [CompanyService],
})
export class CompanyModule {}
