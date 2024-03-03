import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  getUserByIdFromDb,
  getAllUsersFromDb,
} from './controller/get/getRequestHandlers';
@Injectable()
export class AppService {
  getAllUsers() {
    return getAllUsersFromDb;
  }
  getUserById(id: UUID) {
    return getUserByIdFromDb(id);
  }
  addUserToTheDb(userData) {
    console.log('postRequest');
  }
  changeUserInDb(id: string, userData: any) {
    // Logic to update a user by ID
  }
  deleteUser(id: string) {
    // Logic to delete a user by ID
  }
}
