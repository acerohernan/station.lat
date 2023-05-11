import { Employee as PrismaEmployee } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Employee extends PrismaEmployee {}

export enum EmployeeRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  READER = 'READER',
}
