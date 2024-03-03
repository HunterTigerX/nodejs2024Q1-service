import { UUID } from 'crypto';
import { IUser, IArtist, ITrack, IFavorites } from 'src/interfaces/interface';

// const timeStamp = Date.now();
export class temporaryDB {
  private users: IUser[] = [];

  getAllUsers() {
    return this.users;
  }
  getUserById(id: UUID): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  saveUsersData(): void {
    console.log('Hello');
  }
}
