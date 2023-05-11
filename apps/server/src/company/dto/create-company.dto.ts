import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCompanyDTO {
  @IsUUID('4', { message: 'The company_id need to be a valid uuid' })
  id: string;

  @IsUUID('4', { message: 'The owner_id need to be a valid uuid' })
  owner_id: string;
  @IsUUID('4', { message: 'The time_zone_id need to be a valid uuid' })
  time_zone_id: string;

  @Length(6, 20, { message: 'The company_domain must have between 6 and 20 characters' })
  @IsNotEmpty({ message: 'The company_domain is required' })
  @IsString({ message: 'The comapany_domain is invalid' })
  domain: string;

  @IsNotEmpty({ message: 'The company_image is required' })
  @IsString({ message: 'The comapany_image is invalid' })
  image: string;

  @IsNotEmpty({ message: 'The company_name is required' })
  @IsString({ message: 'The comapany_name is invalid' })
  name: string;
}
