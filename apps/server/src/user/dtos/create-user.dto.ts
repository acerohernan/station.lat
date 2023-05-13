import { IsUUID, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsUUID('4', { message: 'The property <user_id> is not a valid uuid' })
  id: string;

  @IsEmail({}, { message: 'The property <user_email> is not a valid email' })
  email: string;

  image_url?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}
