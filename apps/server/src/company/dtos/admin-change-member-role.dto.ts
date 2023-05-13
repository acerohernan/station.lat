import { MemberRole } from '../entities/member.entity';

export class AdminChangeMemberRoleDTO {
  admin_member_id: string;

  member_id: string;
  member_new_role: MemberRole;
}
