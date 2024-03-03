import { UUID } from 'crypto';
import { db } from 'src/main';

export function removeUserFromDb(id: UUID) {
  db.removeUserFromDb(id);
}
export function removeTrackFromDb(id: UUID) {
  db.removeTrackFromDb(id);
}
