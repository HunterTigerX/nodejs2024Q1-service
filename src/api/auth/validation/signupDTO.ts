import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { noTokenPresented } from 'src/errorsAndMessages/errors';
import { IRefreshToken } from '../interface/auth.interfaces';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export function validateRefreshToken(token: IRefreshToken) {
  if (!token.refreshToken) {
    noTokenPresented();
  }
}
