import { IsUUID } from 'class-validator';

export class CreateMemberAccessTokenDTO {
  @IsUUID('4', { message: 'The property <user_id> is not a valid uuid' })
  user_id: string;

  @IsUUID('4', { message: 'The property <company_id> is not a valid uuid' })
  company_id: string;
}
