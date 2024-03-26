import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artists } from './entities/artist.entity';
import { Tracks } from '../track/entities/track.entity';
import {
  FavAlbums,
  FavArtists,
  FavTracks,
} from '../favorites/entities/favorites.entity';
import { Albums } from '../album/entities/album.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Artists]),
    TypeOrmModule.forFeature([Tracks]),
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([FavAlbums]),
    TypeOrmModule.forFeature([FavArtists]),
    TypeOrmModule.forFeature([FavTracks]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
