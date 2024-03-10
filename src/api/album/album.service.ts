import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { IAlbum } from './interface/album.interface';
import { isAlbumDataValid } from './object-validation/validate-album';
import {
  notFound,
  returnData,
  successDeletion,
} from 'src/errorsAndMessages/errors';
import { Albums } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Albums)
    private readonly albumRepository: Repository<Albums>,
  ) {}

  async getAllAlbums() {
    // const albums2= db.getAllAlbums();
    const albums = await this.albumRepository.find();
    return albums;
  }
  async getAlbumById(id: UUID) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (album) {
      return album;
    }
    return notFound();
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
    const albums = this.albumRepository.create(newAlbum);
    await this.albumRepository.save(albums);
    returnData(newAlbum, 'create');
  }
  async updateAlbum(id: UUID, data: IAlbum) {
    isAlbumDataValid(data);
    const albumToChange = await this.albumRepository.findOne({
      where: { id },
    });
    if (albumToChange) {
      albumToChange.name = data.name;
      albumToChange.year = data.year;
      albumToChange.artistId = data.artistId;
      await this.albumRepository.save(albumToChange);
      returnData(albumToChange, 'update');
    } else {
      notFound();
    }
  }

  async deleteAlbum(id: UUID) {
    const albumToDelete = await this.albumRepository.findOne({
      where: { id },
    });
    if (albumToDelete) {
      // const trackToChange = await trackRepository.findOne({
      //   where: { id },
      // });
      // await trackRepository.save(trackToChange);
      // this.favorites.albums = this.favorites.albums.filter((album) => {
      //   album.id !== id;
      // });
      await this.albumRepository.remove(albumToDelete);
      successDeletion();
    } else {
      notFound();
    }
  }
}
