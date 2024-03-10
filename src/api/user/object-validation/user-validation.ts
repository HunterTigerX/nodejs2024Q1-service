import { badBody } from 'src/errorsAndMessages/errors';
import {
  IUpdatePasswordDto,
  ICreateUserDto,
} from '../interface/user.interface';

export function isUserDataValid(
  obj: IUpdatePasswordDto | ICreateUserDto,
  status: 'userCreate' | 'userUpdate',
) {
  let isValid = false;
  if (status === 'userCreate') {
    isValid =
      'login' in obj &&
      'password' in obj &&
      typeof obj.login === 'string' &&
      typeof obj.password === 'string';
  }
  if (status === 'userUpdate') {
    isValid =
      'oldPassword' in obj &&
      'newPassword' in obj &&
      typeof obj.newPassword === 'string' &&
      typeof obj.newPassword === 'string';
  }
  if (!isValid) {
    badBody();
  }
}
