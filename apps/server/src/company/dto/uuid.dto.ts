import { IsUUID } from 'class-validator';

export class UuidDTO {
  @IsUUID('4', { message: 'The uuid is invalid' })
  uuid: string;
}
