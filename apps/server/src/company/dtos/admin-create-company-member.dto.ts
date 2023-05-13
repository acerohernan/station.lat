import { IsEmail, IsEnum, IsUUID } from 'class-validator';
import { MemberRole } from '../entities/member.entity';

export class AdminCreateCompanyMemberDTO {
  @IsUUID('4', { message: 'The property <admin_member_id> is not a valid uuid' })
  admin_member_id: string;

  @IsEmail({}, { message: 'The property <member_user_email> is no a valid email' })
  member_user_email: string;

  @IsEnum(MemberRole, { message: 'The property <member_role> not have a valid value' })
  member_role: MemberRole;
}
