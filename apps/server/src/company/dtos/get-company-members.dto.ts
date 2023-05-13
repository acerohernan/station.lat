import { IsEnum, IsUUID } from 'class-validator';
import { MemberRole } from '../entities/member.entity';

export class GetCompanyMembersDTO {
  @IsUUID('4', { message: 'The property <company_id> is not a valid uuid' })
  company_id: string;

  @IsEnum(MemberRole, { message: 'The property <role> is not valid' })
  role: MemberRole;
}
