import { Controller, Post, Body, UseGuards, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, validateRefreshToken } from './validation/signupDTO';
import { IRefreshToken } from './interface/auth.interfaces';
import { RefreshTokenGuard } from '../guards/tokensGuards';
import { LoggingService } from '../logger/logger.service';
import { CustomExceptionFilter } from '../filter/exception-filter.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggingService,
  ) {}

  @UseFilters(CustomExceptionFilter)
  @Post('/signup')
  signUserUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUser(createUserDto);
  }

  @UseFilters(CustomExceptionFilter)
  @Post('/login')
  logUserIn(@Body() loginUserDto: CreateUserDto) {
    return this.authService.logUser(loginUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: IRefreshToken) {
    validateRefreshToken(refreshTokenDto);
    return this.authService.refresh(refreshTokenDto);
  }
}
