import { PrismaService } from 'src/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository {
  constructor(private prismaService: PrismaService) {}
}
