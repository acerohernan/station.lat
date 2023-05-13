import { IsUUID, IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class WelcomeFlowDTO {
  @IsUUID('4', { message: 'The property <user_id> is not a valid uuid' })
  id: string;

  @IsNotEmpty({ message: 'The property <user_image_url> is required' })
  @IsString({ message: 'The property <user_image_url> is not a valid string' })
  image_url: string;

  @IsNotEmpty({ message: 'The property <user_first_name> is required' })
  @IsString({ message: 'The property <user_first_name> is not a valid string' })
  first_name: string;

  @IsNotEmpty({ message: 'The property <user_last_name> is required' })
  @IsString({ message: 'The property <user_last_name> is not a valid string' })
  last_name: string;

  @IsNotEmpty({ message: 'The property <user_phone> is required' })
  @IsNumberString({}, { message: 'The property <user_phone> is not a valid number' })
  phone: string;
}
