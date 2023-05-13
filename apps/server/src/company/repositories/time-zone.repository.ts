import { PrismaService } from 'src/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { TimeZone } from '../entities/time-zone.entity';

@Injectable()
export class TimeZoneRepository {
  constructor(private prismaService: PrismaService) {}

  async getById(id: string): Promise<TimeZone | null> {
    return this.prismaService.timeZone.findUnique({ where: { id } });
  }
}
