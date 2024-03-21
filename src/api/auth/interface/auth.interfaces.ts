import { CreateUserDto } from '../validation/signupDTO';

export interface IUserTokens extends CreateUserDto {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}
