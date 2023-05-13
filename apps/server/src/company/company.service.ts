import { BadRequestException, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Validator } from 'src/shared/utils/validator.util';
import { MemberRepository } from './repositories/member.repository';
import { Member, MemberRole } from './entities/member.entity';
import { UuidDTO } from 'src/shared/dtos/uuid.dto';
import { Company } from './entities/company.entity';
import { CompanyRepository } from './repositories/company.repository';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { CreateCompanyMemberDTO } from './dtos/create-company-member.dto';
import { TimeZoneRepository } from './repositories/time-zone.repository';
import { CreateMemberAccessTokenDTO } from './dtos/create-member-acess-token.dto';
import { createSigner } from 'fast-jwt';
import { GetCompanyMembersDTO } from './dtos/get-company-members.dto';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private memberRepository: MemberRepository,
    private timeZoneRepository: TimeZoneRepository
  ) {}

  async getMembershipsFromUser(user_id: string): Promise<Member[]> {
    // Validate the input
    const { success } = await Validator.validate(UuidDTO, { uuid: user_id });

    if (!success) throw new BadRequestException(`The user_id is not a valid uuid`);

    // Return the memberships of the user
    return await this.memberRepository.getByUserId(user_id);
  }
  async getCompaniesFromUser(user_id: string): Promise<Company[]> {
    // Validate the input
    const { success } = await Validator.validate(UuidDTO, { uuid: user_id });

    if (!success) throw new BadRequestException(`The user_id is not a valid uuid`);

    // Return the memberships of the user
    return this.companyRepository.getByUserId(user_id);
  }

  async createCompany(dto: CreateCompanyDTO): Promise<Company> {
    // Validate the input
    const { success, errors } = await Validator.validate(CreateCompanyDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Verify if the time_zone_exists
    const time_zone = await this.timeZoneRepository.getById(dto.time_zone_id);

    if (!time_zone) throw new BadRequestException(`The time_zone_id is not found in the system`);

    // Create the company
    const { id, user_id, time_zone_id, domain, name, image_url } = dto;

    const newCompany: Company = {
      id,
      time_zone_id,
      user_id,
      domain,
      name,
      image_url: image_url ?? null,
      is_pro: false,
      last_month_payment_failed: false,
      free_trial_finished: false,
    };

    return this.companyRepository.create(newCompany);
  }

  async createCompanyMember(dto: CreateCompanyMemberDTO): Promise<Member> {
    // Validate the input
    const { success, errors } = await Validator.validate(CreateCompanyMemberDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Create the member
    const { id, company_id, role, user_id } = dto;

    const newMember: Member = {
      id,
      company_id,
      user_id,
      role,
    };

    return this.memberRepository.create(newMember);
  }

  async createMemberAccessToken(dto: CreateMemberAccessTokenDTO): Promise<string> {
    // Validate the input
    const { success, errors } = await Validator.validate(CreateMemberAccessTokenDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Get the membership
    const { user_id, company_id } = dto;

    const membership = await this.memberRepository.getByUserIdAndCompanyId({ user_id, company_id });

    if (!membership) throw new ForbiddenException(`You are not allowed to access this company`);

    // Return the token
    return this.createMemberJwtToken({ user_id, company_id, role: membership.role });
  }

  async getCompany(company_id: string): Promise<Company> {
    const { success } = await Validator.validate(UuidDTO, { uuid: company_id });

    if (!success) throw new BadRequestException(`The property <company_id> is not a valid uuid`);

    const company = await this.companyRepository.getById(company_id);

    if (!company) throw new NotFoundException(`A company with the id <${company_id}> not exits`);

    return company;
  }

  async getCompanyMembers(dto: GetCompanyMembersDTO): Promise<Member[]> {
    // Validate the input
    const { success, errors } = await Validator.validate(GetCompanyMembersDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Validate if the user has a ADMIN role
    const isAdmin = dto.role === MemberRole.ADMIN;

    if (!isAdmin) throw new ForbiddenException(`Only company's admins can see the members`);

    // Return the members
    return this.memberRepository.getByCompanyId(dto.company_id);
  }

  private createMemberJwtToken({
    company_id,
    role,
    user_id,
  }: {
    user_id: string;
    company_id: string;
    role: Member['role'];
  }): string {
    const payload = {
      company_id,
      role,
    };

    const expiresIn = 100 * 60 * 60 * 24; // 24 hours
    const signer = createSigner({ key: process.env.JWT_COMPANY_SECRET, expiresIn, sub: user_id });

    return signer(payload);
  }
}
