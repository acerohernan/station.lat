import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OwnerModule } from './owner/owner.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), OwnerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
