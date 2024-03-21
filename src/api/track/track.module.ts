import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Tracks } from './entities/track.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from '../album/entities/album.entity';
import { Artists } from '../artist/entities/artist.entity';
import {
  FavAlbums,
  FavArtists,
  FavTracks,
} from '../favorites/entities/favorites.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Artists]),
    TypeOrmModule.forFeature([Tracks]),
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([FavAlbums]),
    TypeOrmModule.forFeature([FavArtists]),
    TypeOrmModule.forFeature([FavTracks]),
    JwtModule.register({}),
  ],
  controllers: [TrackController],
  providers: [TrackService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class TrackModule {}
