import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EmployeeRole } from '../entities/employee.entity';

export class CreateEmployeeDTO {
  @IsUUID('4', { message: 'The employee_id need to be a valid uuid' })
  id: string;

  @IsUUID('4', { message: 'The employee_company_id need to be a valid uuid' })
  company_id: string;

  @IsEnum(EmployeeRole, { message: 'The employee_role is invalid' })
  role: EmployeeRole;

  @IsEmail({}, { message: 'The employee_email is not a valid email' })
  email: string;

  image?: string;

  @IsNotEmpty({ message: 'The company_image is required' })
  @IsString({ message: 'The comapany_image is invalid' })
  name: string;
}
