import { HttpException, HttpStatus } from '@nestjs/common';

export function returnData(data: any, operation: 'create' | 'update') {
  if (operation === 'create') {
    throw new HttpException(data, HttpStatus.CREATED);
  } else if (operation === 'update') {
    throw new HttpException(data, HttpStatus.OK);
  }
}
