import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { db } from 'src/main';
@Injectable()
export class FavService {
  getAllFavorites() {
    const favorites = db.getAllFavorites();
    return favorites;
  }
  addFav(id: UUID, type: 'track' | 'album' | 'artist') {
    db.addRemoveFavs(id, type, 'add');
  }
  deleteFromFav(id: UUID, type: 'track' | 'artist' | 'album') {
    db.addRemoveFavs(id, type, 'remove');
  }
}
