import { PrismaService } from 'src/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(private prismaService: PrismaService) {}

  async getByUserId(user_id: string): Promise<Array<Member>> {
    return this.prismaService.member.findMany({ where: { user_id } });
  }
}
