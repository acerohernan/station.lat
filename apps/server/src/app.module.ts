import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, CompanyModule],
  controllers: [AppController],
})
export class AppModule {}
