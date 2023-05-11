import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  async create(company: Company): Promise<Company> {
    return this.prismaService.company.create({ data: company });
  }
}
