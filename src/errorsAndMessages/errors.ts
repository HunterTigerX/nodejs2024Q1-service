import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class Errors {
  checkUUID(id: string | UUID) {
    if (!isUUID(id, 4)) {
      throw new HttpException(
        'ID is not in UUID format',
        HttpStatus.BAD_REQUEST,
      ); // 400
    }
  }

  badBody() {
    throw new HttpException(
      'Your body does not contain required fields',
      HttpStatus.BAD_REQUEST, // 400
    );
  }

  somethingExists(string: 'user' | 'artist' | 'track' | 'album' | 'favorites') {
    let param = 'id';
    if (string === 'user') {
      param = 'login';
    }
    throw new HttpException(
      `${string} with this ${param} already exists in our DB`,
      HttpStatus.UNAUTHORIZED, // 401
    );
  }

  errorUnathorized(text: string) {
    throw new HttpException(
      text,
      HttpStatus.UNAUTHORIZED, // 401
    );
  }

  forbiddenError(text: string) {
    throw new HttpException(
      text,
      HttpStatus.FORBIDDEN, // 403
    );
  }

  notFound() {
    throw new HttpException(
      'this ID was not found in our database',
      HttpStatus.NOT_FOUND, // 404
    );
  }

  unprocessableEntityError(operation: 'artist' | 'album' | 'track') {
    throw new HttpException(
      `${operation} with this id is already in favorites or there is no ${operation} with this id in our database`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    ); // 422
  }
}

export class Messages {
  returnCreatedData(data: any) {
    throw new HttpException(data, HttpStatus.CREATED); // 201
  }

  returnUpdatedData(data: any) {
    throw new HttpException(data, HttpStatus.OK); // 200
  }

  successDeletion() {
    throw new HttpException('Success', HttpStatus.NO_CONTENT); // 204
  }
}
