import { UUID } from 'crypto';
import { db } from 'src/main';

export function removeUserFromDb(id: UUID) {
  db.removeUserFromDb(id);
}
export function removeTrackFromDb(id: UUID) {
  db.removeTrackFromDb(id);
}
export function removeAlbumFromDb(id: UUID) {
  db.removeAlbumFromDb(id);
}

export function removeArtistFromDb(id: UUID) {
  db.removeArtistFromDb(id);
}

export function removeFavsFromDb(id: UUID) {
  db.removeFavsFromDb(id);
}
