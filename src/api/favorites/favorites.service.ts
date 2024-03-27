import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { FavAlbums, FavArtists, FavTracks } from './entities/favorites.entity';
import { Tracks } from '../track/entities/track.entity';
import { Artists } from '../artist/entities/artist.entity';
import { Albums } from '../album/entities/album.entity';
import { Errors, Messages } from 'src/errorsAndMessages/errors';
import { LoggingService } from '../logger/logger.service';

const errors = new Errors();
const message = new Messages();

@Injectable()
export class FavService {
  constructor(
    @InjectRepository(Albums)
    private readonly albumsRepository: Repository<Albums>,
    @InjectRepository(FavAlbums)
    private readonly favAlbumsRepository: Repository<FavAlbums>,
    @InjectRepository(Artists)
    private readonly artistsRepository: Repository<Artists>,
    @InjectRepository(FavArtists)
    private readonly favArtistsRepository: Repository<FavArtists>,
    @InjectRepository(Tracks)
    private readonly tracksRepository: Repository<Tracks>,
    @InjectRepository(FavTracks)
    private readonly favTracksRepository: Repository<FavTracks>,
    private readonly logger: LoggingService,
  ) {}

  async getAllFavorites() {
    const favAlbums = await this.favAlbumsRepository.find();
    const favArtists = await this.favArtistsRepository.find();
    const favTracks = await this.favTracksRepository.find();
    const result = {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
    return result;
  }

  async addFavTrack(id: UUID) {
    const doTrackExistInDb = await this.tracksRepository.find({
      where: {
        id,
      },
    });
    if (doTrackExistInDb[0]) {
      const existingFavoriteTracks = await this.favTracksRepository.find({
        where: {
          id,
        },
      });
      if (existingFavoriteTracks[0]) {
        errors.unprocessableEntityError('track');
      } else {
        const favTracks = this.favTracksRepository.create(doTrackExistInDb[0]);
        await this.favTracksRepository.save(favTracks);
        message.returnCreatedData(await this.favTracksRepository.find());
      }
    } else {
      errors.unprocessableEntityError('track');
    }
  }

  async addFavAlbum(id: UUID) {
    const doAlbumExistInDb = await this.albumsRepository.find({
      where: {
        id,
      },
    });
    if (doAlbumExistInDb[0]) {
      const existingFavoriteAlbums = await this.favAlbumsRepository.find({
        where: {
          id,
        },
      });
      if (existingFavoriteAlbums[0]) {
        errors.unprocessableEntityError('album');
      } else {
        const favAlbums = this.favAlbumsRepository.create(doAlbumExistInDb[0]);
        await this.favAlbumsRepository.save(favAlbums);
        message.returnCreatedData(await this.favAlbumsRepository.find());
      }
    } else {
      errors.unprocessableEntityError('album');
    }
  }

  async addFavArtist(id: UUID) {
    const doArtistExistInDb = await this.artistsRepository.find({
      where: {
        id,
      },
    });
    if (doArtistExistInDb[0]) {
      const existingFavoriteArtists = await this.favArtistsRepository.find({
        where: {
          id,
        },
      });
      if (existingFavoriteArtists[0]) {
        errors.unprocessableEntityError('artist');
      } else {
        const favAlbums = this.favArtistsRepository.create(
          doArtistExistInDb[0],
        );
        await this.favArtistsRepository.save(favAlbums);
        message.returnCreatedData(await this.favArtistsRepository.find());
      }
    } else {
      errors.unprocessableEntityError('artist');
    }
  }

  async deleteTrackFromFav(id: UUID) {
    const favTrackToDelete = await this.favTracksRepository.findOne({
      where: { id },
    });
    if (favTrackToDelete) {
      await this.favTracksRepository.remove(favTrackToDelete);
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }

  async deleteArtistFromFav(id: UUID) {
    const favArtistToDelete = await this.favArtistsRepository.findOne({
      where: { id },
    });
    if (favArtistToDelete) {
      await this.favArtistsRepository.remove(favArtistToDelete);
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }

  async deleteAlbumFromFav(id: UUID) {
    const favAlbumToDelete = await this.favAlbumsRepository.findOne({
      where: { id },
    });
    if (favAlbumToDelete) {
      await this.favAlbumsRepository.remove(favAlbumToDelete);
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }
}
