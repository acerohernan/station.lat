import { IsEnum, IsUUID } from 'class-validator';
import { MemberRole } from '../entities/member.entity';

export class CreateCompanyMemberDTO {
  @IsUUID('4', { message: 'The property <member_id> is not a valid uuid' })
  id: string;

  @IsUUID('4', { message: 'The property <member_company_id> is not a valid uuid' })
  company_id: string;

  @IsUUID('4', { message: 'The property <member_user_id> is not a valid uuid' })
  user_id: string;

  @IsEnum(MemberRole, { message: 'The property <member_role> is invalid' })
  role: MemberRole;
}
