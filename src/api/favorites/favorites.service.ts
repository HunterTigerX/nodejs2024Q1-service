import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { FavAlbums, FavArtists, FavTracks } from './entities/favorites.entity';
import { Tracks } from '../track/entities/track.entity';
import {
  addedToFav,
  alreadyFav,
  noIdInDbWhenFav,
  notFound,
  successDeletion,
} from 'src/errorsAndMessages/errors';

import { Artists } from '../artist/entities/artist.entity';
import { Albums } from '../album/entities/album.entity';
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
  ) {}

  async getAllFavorites() {
    const favAlbums = await this.favAlbumsRepository.find();
    const favArtists = await this.favArtistsRepository.find();
    const favTracks = await this.favTracksRepository.find();

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
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
        alreadyFav('track');
      } else {
        const favTracks = this.favTracksRepository.create(doTrackExistInDb[0]);
        await this.favTracksRepository.save(favTracks);
        return addedToFav(await this.favTracksRepository.find());
      }
    } else {
      noIdInDbWhenFav('track');
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
        alreadyFav('album');
      } else {
        const favAlbums = this.favAlbumsRepository.create(doAlbumExistInDb[0]);
        await this.favAlbumsRepository.save(favAlbums);
        return addedToFav(await this.favAlbumsRepository.find());
      }
    } else {
      noIdInDbWhenFav('album');
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
        alreadyFav('artist');
      } else {
        const favAlbums = this.favArtistsRepository.create(
          doArtistExistInDb[0],
        );
        await this.favArtistsRepository.save(favAlbums);
        return addedToFav(await this.favArtistsRepository.find());
      }
    } else {
      noIdInDbWhenFav('artist');
    }
  }

  async deleteTrackFromFav(id: UUID) {
    const favTrackToDelete = await this.favTracksRepository.findOne({
      where: { id },
    });
    if (favTrackToDelete) {
      await this.favTracksRepository.remove(favTrackToDelete);
      successDeletion();
    } else {
      notFound();
    }
  }

  async deleteArtistFromFav(id: UUID) {
    const favArtistToDelete = await this.favArtistsRepository.findOne({
      where: { id },
    });
    if (favArtistToDelete) {
      await this.favArtistsRepository.remove(favArtistToDelete);
      successDeletion();
    } else {
      notFound();
    }
  }

  async deleteAlbumFromFav(id: UUID) {
    const favAlbumToDelete = await this.favAlbumsRepository.findOne({
      where: { id },
    });
    if (favAlbumToDelete) {
      await this.favAlbumsRepository.remove(favAlbumToDelete);
      successDeletion();
    } else {
      notFound();
    }
  }
}
