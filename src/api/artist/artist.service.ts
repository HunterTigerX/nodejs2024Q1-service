import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { IArtist } from './interface/artist.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artists } from './entities/artist.entity';
import {
  notFound,
  returnData,
  successDeletion,
} from 'src/errorsAndMessages/errors';
import { isArtistDataValid } from './object-validation/validate-artist';
import { Tracks } from '../track/entities/track.entity';
import { Albums } from '../album/entities/album.entity';
import {
  FavAlbums,
  FavArtists,
  FavTracks,
} from '../favorites/entities/favorites.entity';

@Injectable()
export class ArtistService {
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

  async getAllArtists() {
    const artists = await this.artistsRepository.find();
    return artists;
  }

  async addArtist(data: IArtist) {
    const newUUID = randomUUID();
    const newArtist = {
      id: newUUID,
      name: data.name,
      grammy: data.grammy,
    };
    const artists = this.artistsRepository.create(newArtist);
    await this.artistsRepository.save(artists);
    returnData(newArtist, 'create');
  }

  async getArtistById(id: UUID) {
    const artist = await this.artistsRepository.findOne({
      where: { id },
    });

    if (artist) {
      return artist;
    }
    return notFound();
  }

  async updateArtist(id: UUID, data: IArtist) {
    isArtistDataValid(data);
    const artistToChange = await this.artistsRepository.findOne({
      where: { id },
    });
    if (artistToChange) {
      artistToChange.name = data.name;
      artistToChange.grammy = data.grammy;
      await this.artistsRepository.save(artistToChange);
      returnData(artistToChange, 'update');
    } else {
      notFound();
    }
  }
  async deleteArtist(id: UUID) {
    const artistToDelete = await this.artistsRepository.findOne({
      where: { id },
    });
    if (artistToDelete) {
      await this.artistsRepository.remove(artistToDelete);
      const favArtistToDelete = await this.favArtistsRepository.findOne({
        where: { id },
      });
      if (favArtistToDelete) {
        await this.favArtistsRepository.remove(favArtistToDelete);
      }

      // const albumToChange = await this.albumsRepository.findOne({
      //   where: { artistId: id },
      // });
      // if (albumToChange) {
      //   albumToChange.artistId = null;
      //   await this.albumsRepository.save(albumToChange);
      // }
      // const trackToChange = await this.tracksRepository.findOne({
      //   where: { artistId: id },
      // });

      // if (trackToChange) {
      //   trackToChange.artistId = null;
      //   await this.tracksRepository.save(trackToChange);
      // }

      // const favAlbumToChange = await this.favAlbumsRepository.findOne({
      //   where: { artistId: id },
      // });
      // if (favAlbumToChange) {
      //   favAlbumToChange.artistId = null;
      //   await this.favAlbumsRepository.save(favAlbumToChange);
      // }

      // const favTrackToChange = await this.favTracksRepository.findOne({
      //   where: { artistId: id },
      // });
      // if (favTrackToChange) {
      //   favTrackToChange.artistId = null;
      //   await this.favTracksRepository.save(favTrackToChange);
      // }

      successDeletion();
    } else {
      notFound();
    }
  }
}
