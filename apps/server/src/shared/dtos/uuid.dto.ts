import { IsUUID } from 'class-validator';

export class UuidDTO {
  @IsUUID('4', { message: 'The property <uuid> is not a valid uuid' })
  uuid: string;
}
