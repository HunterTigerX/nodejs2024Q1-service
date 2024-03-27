import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class Errors {
  checkUUID(id: string | UUID) {
    if (!isUUID(id, 4)) {
      const message = 'ID is not in UUID format';
      const errorCode = HttpStatus.BAD_REQUEST;
      throw new HttpException(message, errorCode); // 400
    }
  }

  badBody() {
    const message = 'Your body does not contain required fields';
    const errorCode = HttpStatus.BAD_REQUEST;
    throw new HttpException(
      message,
      errorCode, // 400
    );
  }

  somethingExists(string: 'user' | 'artist' | 'track' | 'album' | 'favorites') {
    let param = 'id';
    if (string === 'user') {
      param = 'login';
    }
    const message = `${string} with this ${param} already exists in our DB`;
    const errorCode = HttpStatus.UNAUTHORIZED;
    throw new HttpException(
      message,
      errorCode, // 401
    );
  }

  errorUnathorized(text: string) {
    const errorCode = HttpStatus.UNAUTHORIZED;
    throw new HttpException(
      text,
      errorCode, // 401
    );
  }

  forbiddenError(text: string) {
    const errorCode = HttpStatus.FORBIDDEN;
    throw new HttpException(
      text,
      errorCode, // 403
    );
  }

  notFound() {
    const message = 'this ID was not found in our database';
    const errorCode = HttpStatus.NOT_FOUND;
    throw new HttpException(
      message,
      errorCode, // 404
    );
  }

  unprocessableEntityError(operation: 'artist' | 'album' | 'track') {
    const message = `${operation} with this id is already in favorites or there is no ${operation} with this id in our database`;
    const errorCode = HttpStatus.UNPROCESSABLE_ENTITY;

    throw new HttpException(message, errorCode); // 422
  }
}

export class Messages {
  returnCreatedData(data: any) {
    const responseCode = HttpStatus.CREATED;
    throw new HttpException(data, responseCode); // 201
  }

  returnUpdatedData(data: any) {
    const responseCode = HttpStatus.OK;
    throw new HttpException(data, responseCode); // 200
  }

  successDeletion() {
    const responseCode = HttpStatus.NO_CONTENT;
    throw new HttpException('Success', responseCode); // 204
  }
}
