import { UUID } from 'crypto';
import { CreateUserDto } from '../validation/signupDTO';

export interface IUserTokens extends CreateUserDto {
  id: UUID | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface ITokens extends IRefreshToken {
  accessToken: string;
}
