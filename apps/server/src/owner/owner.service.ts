import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OwnerRepository } from './repositories/owner.repository';
import { OwnerDTO } from './dtos/owner.dto';
import { Validator } from 'src/shared/utils/validator';
import { createSigner } from 'fast-jwt';
import { Owner } from './entities/owner.entity';
import { CompanyService } from 'src/company/company.service';
import { WelcomeFlowDTO } from './dtos/welcome-flow.dto';
import { pick } from 'lodash';
import { randomUUID } from 'crypto';
import { EmployeeRole } from 'src/company/entities/employee.entity';

@Injectable()
export class OwnerService {
  constructor(private ownerRepository: OwnerRepository, private companyService: CompanyService) {}
  async signInWithGoogle(dto: OwnerDTO): Promise<{ access_token: string }> {
    // Validate the input with class validator
    const { success, errors } = await Validator.validate(OwnerDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Check if the user is registered
    const { email } = dto;

    const owner = await this.ownerRepository.getByEmail(email);

    // Create a new owner if not exists
    if (!owner) await this.createOwner(dto);

    // Create and access_token to the owner
    const access_token = this.createAccessToken({ owner_id: dto.id, email: dto.email });

    return { access_token };
  }

  async welcomeFlow(dto: WelcomeFlowDTO): Promise<void> {
    // Validate the input
    const { success, errors } = await Validator.validate(WelcomeFlowDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Verify if is the owner has already completed the welcome flow
    const { owner_id, owner_image, owner_phone, owner_first_name, owner_last_name } = dto;

    const owner = await this.ownerRepository.getById(owner_id);

    if (!owner) throw new NotFoundException(`The owner with id <${owner_id}> is not registered`);

    if (owner.welcome_flow_finished) throw new BadRequestException(`The owner has already completed the welcome flow`);

    // Update the owner information
    await this.updateOwner(owner_id, {
      image: owner_image,
      first_name: owner_first_name,
      last_name: owner_last_name,
      phone: owner_phone,
    });

    // Get the time-zone information
    const { company_time_zone_id, company_domain, company_image, company_name } = dto;
    const time_zone = await this.companyService.getTimeZoneById(company_time_zone_id);

    if (!time_zone) throw new NotFoundException("The company's time_zone_id not exists");

    // Create the company
    const company_id = randomUUID();
    const company = await this.companyService.createCompany({
      id: company_id,
      domain: company_domain,
      image: company_image,
      name: company_name,
      owner_id,
      time_zone_id: time_zone.id,
    });

    // Create the owner's employee account
    const employee_id = randomUUID();
    await this.companyService.createEmployee({
      company_id: company.id,
      email: owner.email,
      id: employee_id,
      image: owner.image ?? undefined,
      name: `${owner.first_name} ${owner.last_name}`,
      role: EmployeeRole.ADMIN,
    });

    // Set owner's welcome_flow_finished to true
    await this.ownerRepository.update(owner.id, { welcome_flow_finished: true });

    return;
  }

  private async createOwner(dto: OwnerDTO) {
    const { id, email, first_name, image, last_name, phone } = dto;

    const newOwner: Owner = {
      id,
      email,
      first_name: first_name ?? null,
      last_name: last_name ?? null,
      image: image ?? null,
      phone: phone ?? null,
      welcome_flow_finished: false,
    };
    await this.ownerRepository.create(newOwner);
  }

  private async updateOwner(owner_id: string, dto: Partial<OwnerDTO>) {
    const ownerUpdatableFields: Array<keyof OwnerDTO> = ['image', 'first_name', 'last_name', 'phone'];
    const ownerData = pick(dto, ownerUpdatableFields);

    await this.ownerRepository.update(owner_id, ownerData);
  }

  private createAccessToken({ email, owner_id }: { owner_id: string; email: string }): string {
    const expiresIn = 1000 * 60 * 60 * 24; // 24 hours
    const signer = createSigner({ key: process.env.JWT_OWNER_SECRET, expiresIn, sub: owner_id });
    return signer({ email });
  }
}
