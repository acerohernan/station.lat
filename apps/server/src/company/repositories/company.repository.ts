import { PrismaService } from 'src/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  create(company: Company): Promise<Company> {
    return this.prismaService.company.create({ data: company });
  }

  getByUserId(user_id: string): Promise<Company[]> {
    return this.prismaService.company.findMany({ where: { user_id } });
  }

  getById(company_id: string): Promise<Company | null> {
    return this.prismaService.company.findUnique({ where: { id: company_id } });
  }
}
