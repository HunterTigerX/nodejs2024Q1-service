import { Module } from '@nestjs/common';
import { FavController } from './favorites.controller';
import { FavService } from './favorites.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavTracks, FavAlbums, FavArtists } from './entities/favorites.entity';
import { Tracks } from '../track/entities/track.entity';
import { Albums } from '../album/entities/album.entity';
import { Artists } from '../artist/entities/artist.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../jwt.strategy';
import { LoggingService } from '../logger/logger.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([FavTracks]),
    TypeOrmModule.forFeature([FavAlbums]),
    TypeOrmModule.forFeature([FavArtists]),
    TypeOrmModule.forFeature([Tracks]),
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([Artists]),
    JwtModule.register({}),
  ],
  controllers: [FavController],
  providers: [
    FavService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LoggingService,
  ],
})
export class FavModule {}
