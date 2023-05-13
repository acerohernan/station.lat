import { Member as PrismaMember } from '@prisma/client';

export enum MemberRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  READER = 'READER',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Member extends PrismaMember {}
