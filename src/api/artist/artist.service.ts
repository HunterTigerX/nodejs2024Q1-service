import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { db } from 'src/main';
import { IArtist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
  getAllArtists() {
    const tracks = db.getAllArtists();
    return tracks;
  }
  addArtist(data: IArtist) {
    const newUUID = randomUUID();
    const newArtist = {
      id: newUUID,
      name: data.name,
      grammy: data.grammy,
    };
    db.addArtist(newArtist);
  }
  getArtistById(id: UUID) {
    const artist = db.getArtistById(id);
    return artist;
  }
  updateArtist(id: UUID, data: IArtist) {
    db.updateArtist(id, data);
  }
  deleteArtist(id: UUID) {
    db.removeArtistFromDb(id);
  }
}
