import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export function checkUUID(id: string | UUID) {
  if (!isUUID(id)) {
    throw new HttpException('ID is not in UUID format', HttpStatus.BAD_REQUEST); // 400
  }
}

export function notFound() {
  throw new HttpException(
    'this ID was not found in our database',
    HttpStatus.NOT_FOUND, // 404
  );
}

export function badBody() {
  throw new HttpException(
    'Your body does not contain required fields',
    HttpStatus.BAD_REQUEST, // 400
  );
}
export function somethingExists(string: 'user' | 'artist' | 'track') {
  let param = 'id';
  if (string === 'user') {
    param = 'login';
  }
  throw new HttpException(
    `${string} with this ${param} already exists in our DB`,
    HttpStatus.UNAUTHORIZED, // 401
  );
}

export function wrongPassword() {
  throw new HttpException(
    'Password mismatch. Old password is wrong',
    HttpStatus.FORBIDDEN, // 403
  );
}

export function returnData(data: any, operation: 'create' | 'update') {
  if (operation === 'create') {
    throw new HttpException(data, HttpStatus.CREATED); // 201
  } else if (operation === 'update') {
    throw new HttpException(data, HttpStatus.OK); // 200
  }
}

export function successDeletion() {
  throw new HttpException('Success', HttpStatus.NO_CONTENT); // 204
}
