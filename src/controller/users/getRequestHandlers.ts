import { db } from 'src/main';
import { UUID } from 'crypto';
import { IUser } from 'src/interfaces/interface';

export function getAllUsersFromDb() {
  const users = db.getAllUsers();
  return users;
}

export function getUserByIdFromDb(id: UUID): IUser | undefined {
  const user = db.getUserById(id);
  return user;
}
