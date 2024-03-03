import { UUID } from 'crypto';
import { ITrack, IUpdatePasswordDto } from 'src/interfaces/interface';
import { db } from 'src/main';

export function updateUserInTheDb(id: UUID, data: IUpdatePasswordDto) {
  db.updateUser(id, data);
}
export function updateTrackInTheDb(id: UUID, data: ITrack) {
  db.updateTrack(id, data);
}
