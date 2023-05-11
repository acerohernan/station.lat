import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Owner } from '../entities/Owner';

@Injectable()
export class OwnerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(owner: Owner): Promise<void> {
    await this.prismaService.owner.create({ data: owner });
  }

  async getByEmail(email: string): Promise<Owner | null> {
    return this.prismaService.owner.findUnique({ where: { email } });
  }

  works() {
    return 'repository works';
  }
}
