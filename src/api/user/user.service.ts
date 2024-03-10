import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { db } from 'src/main';
import {
  ICreateUserDto,
  IUser,
  IUpdatePasswordDto,
} from './interface/user.interface';

@Injectable()
export class UserService {
  getAllUsers() {
    const users = db.getAllUsers();
    return users;
  }

  getUserById(id: UUID) {
    const user = db.getUserById(id);
    return user;
  }

  addUser(data: ICreateUserDto) {
    const newUUID = randomUUID();
    const timeStamp = Date.now();
    const newUser: IUser = {
      login: data.login,
      password: data.password,
      version: 1,
      id: newUUID,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    db.addUser(newUser);
  }
  updateUser(id: UUID, data: IUpdatePasswordDto) {
    db.updateUser(id, data);
  }

  deleteUser(id: UUID) {
    db.removeUserFromDb(id);
  }
}
