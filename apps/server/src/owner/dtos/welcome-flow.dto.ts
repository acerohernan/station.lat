import { IsNotEmpty, IsNumberString, IsString, IsUUID, Length } from 'class-validator';

export class WelcomeFlowDTO {
  @IsUUID('4', { message: 'The owner_id must be a valid uuid' })
  owner_id: string;

  @IsNotEmpty({ message: 'The owner_image must not be empty' })
  @IsString({ message: 'The owner_image must be string' })
  owner_image: string;

  @IsNotEmpty({ message: 'The owner_first_name must not be empty' })
  @IsString({ message: 'The owner_first_name must be string' })
  owner_first_name: string;

  @IsNotEmpty({ message: 'The owner_last_name must not be empty' })
  @IsString({ message: 'The owner_last_name must be string' })
  owner_last_name: string;

  @IsNotEmpty()
  @IsNumberString()
  owner_phone: string;

  @IsNotEmpty({ message: 'The company_domain must not be empty' })
  @IsString({ message: 'The company_domain must be string' })
  @Length(6, 20, { message: 'The company_domain must have between 6 and 20 characters' })
  company_domain: string;

  @IsNotEmpty({ message: 'The company_name must not be empty' })
  @IsString({ message: 'The company_name must be string' })
  company_name: string;

  @IsNotEmpty({ message: 'The company_image must not be empty' })
  @IsString({ message: 'The company_image must be string' })
  company_image: string;

  @IsUUID('4', { message: 'The company_time_zone_id must be a valid uuid' })
  company_time_zone_id: string;
}
