import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, validateRefreshToken } from './validation/signupDTO';
import { IRefreshToken } from './interface/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUserUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUser(createUserDto);
  }

  @Post('/login')
  logUserIn(@Body() loginUserDto: CreateUserDto) {
    return this.authService.logUser(loginUserDto);
  }

  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: IRefreshToken) {
    validateRefreshToken(refreshTokenDto);
    return this.authService.refresh(refreshTokenDto);
  }
}
