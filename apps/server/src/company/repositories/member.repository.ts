import { PrismaService } from 'src/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(private prismaService: PrismaService) {}

  async getByUserId(user_id: string): Promise<Array<Member>> {
    return this.prismaService.member.findMany({ where: { user_id } });
  }

  async getByCompanyId(company_id: string): Promise<Array<Member>> {
    return this.prismaService.member.findMany({ where: { company_id }, include: { user: true } });
  }

  async create(member: Member): Promise<Member> {
    return this.prismaService.member.create({ data: member });
  }

  async getByUserIdAndCompanyId({
    user_id,
    company_id,
  }: {
    user_id: string;
    company_id: string;
  }): Promise<Member | null> {
    return this.prismaService.member.findFirst({ where: { company_id, user_id } });
  }
}
