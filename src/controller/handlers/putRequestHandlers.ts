import { UUID } from 'crypto';
import {
  IAlbum,
  IFavorites,
  ITrack,
  IUpdatePasswordDto,
  IArtist,
} from 'src/interfaces/interface';
import { db } from 'src/main';

export function updateUserInTheDb(id: UUID, data: IUpdatePasswordDto) {
  db.updateUser(id, data);
}
export function updateTrackInTheDb(id: UUID, data: ITrack) {
  db.updateTrack(id, data);
}
export function updateAlbumInTheDb(id: UUID, data: IAlbum) {
  db.updateAlbum(id, data);
}
export function updateArtistInTheDb(id: UUID, data: IArtist) {
  db.updateArtist(id, data);
}
export function updateFavInTheDb(id: UUID, data: IFavorites) {
  db.updateFavs(id, data);
}
