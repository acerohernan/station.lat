import { PrismaService } from 'src/shared/services/prisma.service';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  async update(user_id: string, data: Partial<User>): Promise<User> {
    return this.prismaService.user.update({ where: { id: user_id }, data });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async getById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
