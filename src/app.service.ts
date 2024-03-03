import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  getUserByIdFromDb,
  getAllUsersFromDb,
} from './controller/users/getRequestHandlers';
import { addUserToTheDb } from './controller/users/postRequestHandlers';
import { ICreateUserDto, IUpdatePasswordDto } from './interfaces/interface';
import { updateUserInTheDb } from './controller/users/putRequestHandlers';
import { removeUserFromDb } from './controller/users/deleteRequestHandlers';
@Injectable()
export class AppService {
  getAllUsers() {
    return getAllUsersFromDb;
  }
  getUserById(id: UUID) {
    return getUserByIdFromDb(id);
  }
  addUser(userData: ICreateUserDto) {
    addUserToTheDb(userData);
  }
  updateUser(id: UUID, userData: IUpdatePasswordDto) {
    updateUserInTheDb(id, userData);
  }
  deleteUser(id: UUID) {
    removeUserFromDb(id);
  }
}
