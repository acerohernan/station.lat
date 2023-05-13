import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserGoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from './repositories/user.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [UserController],
  providers: [UserGoogleStrategy, UserService, UserRepository],
  imports: [SharedModule],
})
export class UserModule {}
