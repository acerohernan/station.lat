import { PrismaService } from 'src/shared/services/prisma.service';
import { TimeZone } from '../entities/time-zone.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeZoneRepository {
  constructor(private prismaService: PrismaService) {}

  async getById(time_zone_id: string): Promise<TimeZone | null> {
    return this.prismaService.timeZone.findUnique({ where: { id: time_zone_id } });
  }
}
