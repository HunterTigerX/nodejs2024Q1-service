import { UUID } from 'crypto';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUser extends ICreateUserDto {
  id: UUID;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IUserSmall extends ICreateUserDto {
  id: UUID;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
