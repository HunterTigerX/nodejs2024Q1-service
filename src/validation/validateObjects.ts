import { ICreateUserDto, IUpdatePasswordDto } from 'src/interfaces/interface';
import { badBody } from 'src/errorsAndMessages/errors';

export function isPostUserValid(
  obj: ICreateUserDto | IUpdatePasswordDto,
  status: 'create' | 'update',
): void {
  let isValid = false;
  if (status === 'create') {
    if ('login' in obj && 'password' in obj) {
      isValid = true;
    }
  } else if (status === 'update') {
    if ('oldPassword' in obj && 'newPassword' in obj) {
      isValid = true;
    }
  }
  if (isValid === false) {
    badBody();
  }
}
