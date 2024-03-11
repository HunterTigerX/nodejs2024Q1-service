import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
