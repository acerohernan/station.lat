import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './repositories/company.repository';
import { SharedModule } from 'src/shared/shared.module';
import { TimeZoneRepository } from './repositories/time-zone.repository';
import { EmployeeRepository } from './repositories/employee.repository';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, TimeZoneRepository, EmployeeRepository],
  exports: [CompanyService],
  imports: [SharedModule],
})
export class CompanyModule {}
