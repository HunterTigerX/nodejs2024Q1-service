import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { IAlbum } from './interface/album.interface';
import { isAlbumDataValid } from './object-validation/validate-album';
import { Albums } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavAlbums, FavTracks } from '../favorites/entities/favorites.entity';
import { Tracks } from '../track/entities/track.entity';
import { Errors, Messages } from 'src/errorsAndMessages/errors';
import { LoggingService } from '../logger/logger.service';
const errors = new Errors();
const message = new Messages();

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Albums)
    private readonly albumsRepository: Repository<Albums>,
    @InjectRepository(FavAlbums)
    private readonly favAlbumsRepository: Repository<FavAlbums>,
    @InjectRepository(Tracks)
    private readonly tracksRepository: Repository<Tracks>,
    @InjectRepository(FavTracks)
    private readonly favTracksRepository: Repository<FavTracks>,
    private readonly logger: LoggingService,
  ) {}

  async getAllAlbums() {
    const albums = await this.albumsRepository.find();
    return albums;
  }

  async getAlbumById(id: UUID) {
    const album = await this.albumsRepository.findOne({
      where: { id },
    });
    if (album) {
      message.returnUpdatedData(album);
    }
    errors.notFound();
  }

  async addAlbum(data: IAlbum) {
    isAlbumDataValid(data);
    const newUUID = randomUUID(); // If there is an id in body it doesn't matter
    const newAlbum = {
      id: newUUID,
      name: data.name,
      year: data.year,
      artistId: data.artistId,
    };
    const albums = this.albumsRepository.create(newAlbum);
    await this.albumsRepository.save(albums);
    message.returnCreatedData(newAlbum);
  }

  async updateAlbum(id: UUID, data: IAlbum) {
    isAlbumDataValid(data);
    const albumToChange = await this.albumsRepository.findOne({
      where: { id },
    });
    if (albumToChange) {
      albumToChange.name = data.name;
      albumToChange.year = data.year;
      albumToChange.artistId = data.artistId;
      await this.albumsRepository.save(albumToChange);
      message.returnUpdatedData(albumToChange);
    } else {
      errors.notFound();
    }
  }

  async deleteAlbum(id: UUID) {
    const albumToDelete = await this.albumsRepository.findOne({
      where: { id },
    });
    if (albumToDelete) {
      await this.albumsRepository.remove(albumToDelete);
      const favAlbumToDelete = await this.favAlbumsRepository.findOne({
        where: { id },
      });
      if (favAlbumToDelete) {
        await this.favAlbumsRepository.remove(favAlbumToDelete);
      }
      // const trackToChange = await this.tracksRepository.findOne({
      //   where: { albumId: id },
      // });
      // if (trackToChange) {
      //   trackToChange.albumId = null;
      //   await this.tracksRepository.save(trackToChange);
      // }
      // const favTrackToChange = await this.favTracksRepository.findOne({
      //   where: { albumId: id },
      // });
      // if (favTrackToChange) {
      //   favTrackToChange.albumId = null;
      //   await this.favTracksRepository.save(favTrackToChange);
      // }
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }
}
