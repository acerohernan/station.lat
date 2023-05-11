import { Injectable, BadRequestException } from '@nestjs/common';
import { TimeZoneRepository } from './repositories/time-zone.repository';
import { Validator } from 'src/shared/utils/validator';
import { UuidDTO } from './dto/uuid.dto';
import { TimeZone } from './entities/time-zone.entity';
import { CompanyRepository } from './repositories/company.repository';
import { Company } from './entities/company.entity';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { EmployeeRepository } from './repositories/employee.repository';

@Injectable()
export class CompanyService {
  constructor(
    private timeZoneRepository: TimeZoneRepository,
    private companyRepository: CompanyRepository,
    private employeeRepository: EmployeeRepository
  ) {}

  async createCompany(dto: CreateCompanyDTO): Promise<Company> {
    // Validate the dto input
    const { success, errors } = await Validator.validate(CreateCompanyDTO, dto);

    if (!success) throw new BadRequestException(errors);

    const { domain, id, name, owner_id, time_zone_id, image } = dto;

    return this.companyRepository.create({
      domain,
      id,
      image,
      time_zone_id,
      owner_id,
      name,
      free_trial_finished: false,
      is_pro: false,
      last_month_payment_failed: false,
    });
  }

  async getTimeZoneById(time_zone_id: string): Promise<TimeZone | null> {
    // Validate if is a valid uuid
    const { success } = await Validator.validate(UuidDTO, { uuid: time_zone_id });

    if (!success) throw new BadRequestException('The <id> of the time zone is not a valid uuid');

    return this.timeZoneRepository.getById(time_zone_id);
  }

  async createEmployee(dto: CreateEmployeeDTO): Promise<Employee> {
    // Validate the dto input
    const { success, errors } = await Validator.validate(CreateEmployeeDTO, dto);

    if (!success) throw new BadRequestException(errors);

    const { id, company_id, email, image, name, role } = dto;

    const newEmployee: Employee = {
      id,
      company_id,
      email,
      image: image ?? null,
      name,
      role,
      created_at: new Date(),
    };

    return this.employeeRepository.create(newEmployee);
  }
}
