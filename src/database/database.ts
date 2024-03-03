import { UUID, randomUUID } from 'crypto';
import { notFound, userExists, wrongPassword } from '../errors/errors';
import {
  INewUser,
  IUser,
  IArtist,
  ITrack,
  IFavorites,
  IUpdatePasswordDto,
} from 'src/interfaces/interface';
import { returnData } from 'src/controller/returnData/returnData';

export class temporaryDB {
  private users: IUser[] = [];

  getAllUsers() {
    return this.users;
  }
  getUserById(id: UUID): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  checkUserByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    return user;
  }
  addUser(data: INewUser) {
    if (!this.checkUserByLogin(data.login)) {
      const newUUID = randomUUID();
      const timeStamp = Date.now();
      const newUser: IUser = {
        ...data,
        version: 1,
        id: newUUID,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      };
      this.users.push(newUser);
      this.returnUserDataWithousPass(newUser, 'create');
    } else {
      // user with this login exists in our db
      userExists();
    }
  }
  returnUserDataWithousPass(data: any, operation: 'create' | 'update') {
    const copy = JSON.parse(JSON.stringify(data));
    delete copy.password;
    console.log('Check later!!!');
    // !!! Check in chat the format of the new user, login or full data withour pass. No pass is in video req.
    return returnData(copy, operation);
  }
  updateUser(id: UUID, data: IUpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const userOldPassword = user.password;
      if (data.oldPassword === userOldPassword) {
        const timeStamp = Date.now();
        user.password = data.newPassword;
        user.version += 1;
        user.updatedAt = timeStamp;
        this.returnUserDataWithousPass(user, 'update');
      } else {
        wrongPassword();
      }
    } else {
      notFound();
    }
  }
}
