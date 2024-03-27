import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LoggingService } from '../logger/logger.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LoggingService,
  ],
})
export class UserModule {}
