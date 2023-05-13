import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CompanyRepository } from './repositories/company.repository';
import { MemberRepository } from './repositories/member.repository';
import { TimeZoneRepository } from './repositories/time-zone.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, MemberRepository, TimeZoneRepository, UserRepository],
  imports: [SharedModule],
  exports: [CompanyService],
})
export class CompanyModule {}
