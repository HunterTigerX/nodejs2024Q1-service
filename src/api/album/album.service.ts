import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { IAlbum } from './interface/album.interface';
import { db } from 'src/main';
import { isAlbumDataValid } from './dto/create-album.dto';
import { notFound } from 'src/errorsAndMessages/errors';
@Injectable()
export class AlbumService {
  getAllAlbums() {
    const albums = db.getAllAlbums();
    return albums;
  }
  getAlbumById(id: UUID) {
    const album = db.getAlbumById(id);
    if (album) {
      return album;
    }
    return notFound();
  }
  addAlbum(data: IAlbum) {
    isAlbumDataValid(data);
    const newUUID = randomUUID();
    const newAlbum = {
      id: newUUID,
      name: data.name,
      year: data.year,
      artistId: data.artistId,
    };
    db.addAlbum(newAlbum);
  }
  updateAlbum(id: UUID, data: IAlbum) {
    isAlbumDataValid(data);
    db.updateAlbum(id, data);
  }

  deleteAlbum(id: UUID) {
    db.removeAlbumFromDb(id);
  }
}
