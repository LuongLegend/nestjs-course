import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
