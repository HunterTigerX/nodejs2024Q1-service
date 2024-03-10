import { UUID } from 'crypto';

export interface INewUser {
  login: string;
  password: string;
}

export interface IUser extends INewUser {
  id: UUID;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
