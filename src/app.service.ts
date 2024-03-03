import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  getUserByIdFromDb,
  getAllUsersFromDb,
} from './controller/get/getRequestHandlers';
import { addUserToTheDb } from './controller/post/postRequestHandlers';
import { ICreateUserDto, IUpdatePasswordDto } from './interfaces/interface';
import { updateUserInTheDb } from './controller/put/putRequestHandlers';
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
  changeUserInDb(userData: any) {
    // Logic to update a user by ID
  }
  deleteUser(id: string) {
    // Logic to delete a user by ID
  }
}
