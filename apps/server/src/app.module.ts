import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OwnerModule } from './owner/owner.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ConfigModule.forRoot(), OwnerModule, CompanyModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
