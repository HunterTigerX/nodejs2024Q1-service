import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Albums } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Artists } from '../artist/entities/artist.entity';
import {
  FavAlbums,
  FavArtists,
  FavTracks,
} from '../favorites/entities/favorites.entity';
import { Tracks } from '../track/entities/track.entity';

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
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
