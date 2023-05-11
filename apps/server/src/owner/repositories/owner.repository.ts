import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Owner } from '../entities/owner.entity';

@Injectable()
export class OwnerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(owner: Owner): Promise<void> {
    await this.prismaService.owner.create({ data: owner });
  }

  async getByEmail(email: string): Promise<Owner | null> {
    return this.prismaService.owner.findUnique({ where: { email } });
  }

  async getById(id: string): Promise<Owner | null> {
    return this.prismaService.owner.findUnique({ where: { id } });
  }

  async update(owner_id: string, owner: Partial<Owner>): Promise<void> {
    await this.prismaService.owner.update({ where: { id: owner_id }, data: owner });
  }
}
