import { IsUUID, IsEmail } from 'class-validator';

export class OwnerDTO {
  @IsUUID('4', { message: 'The id is not a valid uuid' })
  id: string;

  @IsEmail({}, { message: 'Please add a valid email addresss' })
  email: string;

  image?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}
