import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { OwnerRepository } from './repositories/owner.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, GoogleStrategy, OwnerRepository, PrismaService],
})
export class OwnerModule {}
