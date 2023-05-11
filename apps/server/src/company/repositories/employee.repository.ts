import { PrismaService } from 'src/shared/services/prisma.service';
import { Employee } from '../entities/employee.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository {
  constructor(private prismaService: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    return this.prismaService.employee.create({ data: employee });
  }
}
