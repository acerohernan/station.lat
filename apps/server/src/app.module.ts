import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, CompanyModule],
  controllers: [AppController],
})
export class AppModule {}
