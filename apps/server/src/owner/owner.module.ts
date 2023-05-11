import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { OwnerRepository } from './repositories/owner.repository';
import { CompanyModule } from 'src/company/company.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, GoogleStrategy, OwnerRepository],
  imports: [SharedModule, CompanyModule],
})
export class OwnerModule {}
