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
import { AdminCreateCompanyMemberDTO } from './dtos/admin-create-company-member.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { randomUUID } from 'crypto';
import { AdminChangeMemberRoleDTO } from './dtos/admin-change-member-role.dto';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private memberRepository: MemberRepository,
    private timeZoneRepository: TimeZoneRepository,
    private userRepository: UserRepository
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
    return this.createMemberJwtToken({ member_id: membership.id });
  }

  async getCompany(member_id: string): Promise<Company> {
    const { success } = await Validator.validate(UuidDTO, { uuid: member_id });

    if (!success) throw new BadRequestException(`The property <member_id> is not a valid uuid`);

    const membership = await this.memberRepository.getById(member_id);

    if (!member_id) throw new ForbiddenException(`You are not allowed to see this resource`);

    const company = await this.companyRepository.getById(membership.company_id);

    if (!company) throw new NotFoundException(`A company with the id <${membership.company_id}> not exits`);

    return company;
  }

  async adminGetCompanyMembers(member_id: string): Promise<Member[]> {
    // Validate the input
    const { success } = await Validator.validate(UuidDTO, { uuid: member_id });

    if (!success) throw new BadRequestException(`The member_id is not a valid uuid`);

    // Validate if the user has a ADMIN role
    const admin = await this.ensureMemberIsAdmin(member_id);

    // Return the members
    return this.memberRepository.getByCompanyId(admin.company_id);
  }

  async adminCreateCompanyMember(dto: AdminCreateCompanyMemberDTO) {
    // Validate the input
    const { success, errors } = await Validator.validate(AdminCreateCompanyMemberDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Find the member information
    const { admin_member_id, member_user_email, member_role } = dto;

    const adminMember = await this.ensureMemberIsAdmin(admin_member_id);

    // Find the user by the email
    const user = await this.userRepository.getByEmail(member_user_email);

    if (!user) throw new NotFoundException(`The email <${member_user_email}> is not registered`);

    await this.createCompanyMember({
      company_id: adminMember.company_id,
      user_id: user.id,
      role: member_role,
      id: randomUUID(),
    });

    return;
  }

  async adminChangeMemberRole(dto: AdminChangeMemberRoleDTO) {
    // Validate input
    const { success, errors } = await Validator.validate(AdminChangeMemberRoleDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Verify if the member is admin
    const { admin_member_id, member_id, member_new_role } = dto;

    await this.ensureMemberIsAdmin(admin_member_id);

    // Change the member role
    await this.memberRepository.updateMember(member_id, { role: member_new_role });

    return;
  }

  private async ensureMemberIsAdmin(member_id): Promise<Member> {
    const member = await this.memberRepository.getById(member_id);

    const isAdmin = member.role === MemberRole.ADMIN;

    if (!isAdmin) throw new ForbiddenException(`Only company's admins can see the members`);

    return member;
  }

  private createMemberJwtToken({ member_id }: { member_id: string }): string {
    const payload = {};

    const expiresIn = 100 * 60 * 60 * 24; // 24 hours
    const signer = createSigner({ key: process.env.JWT_COMPANY_SECRET, expiresIn, sub: member_id });

    return signer(payload);
  }
}
