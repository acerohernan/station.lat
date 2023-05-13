import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCompanyDTO {
  @IsUUID('4', { message: 'The property <company_id> is not a valid uuid' })
  id: string;

  @IsUUID('4', { message: 'The property <company_user_id> is not a valid uuid' })
  user_id: string;

  @IsUUID('4', { message: 'The property <company_time_zone_id> is not a valid uuid' })
  time_zone_id: string;

  @Length(6, 20, { message: 'The property company_domain must have between 6 and 20 characters' })
  @IsNotEmpty({ message: 'The property company_domain is required' })
  domain: string;

  @IsString({ message: 'The property company_name is not a valid string' })
  @IsNotEmpty({ message: 'The property company_name is required' })
  name: string;

  image_url?: string;
}
