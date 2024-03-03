import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export function checkUUID(id: string | UUID) {
  if (!isUUID(id)) {
    throw new HttpException('ID is not in UUID format', HttpStatus.BAD_REQUEST);
  }
}

export function notFound() {
  throw new HttpException(
    'this ID was not found in our database',
    HttpStatus.NOT_FOUND,
  );
}

/*

throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400,
}

*/
