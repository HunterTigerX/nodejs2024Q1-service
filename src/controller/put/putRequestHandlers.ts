import { UUID } from 'crypto';
import { IUpdatePasswordDto } from 'src/interfaces/interface';
import { db } from 'src/main';

export function updateUserInTheDb(id: UUID, data: IUpdatePasswordDto) {
  db.updateUser(id, data);
}
