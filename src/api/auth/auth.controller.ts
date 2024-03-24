import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, validateRefreshToken } from './validation/signupDTO';
import { IRefreshToken } from './interface/auth.interfaces';
import { RefreshTokenGuard } from '../guards/tokensGuards';
import { LoggingService } from '../logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggingService,
  ) {}

  @Post('/signup')
  signUserUp(@Body() createUserDto: CreateUserDto, @Req() request: any) {
    const queryParams = request.query;
    const url = request.url;
    const result = {
      url,
      queryParams,
      body: createUserDto,
    };
    this.logger.log(result);
    return this.authService.signUser(createUserDto);
  }

  @Post('/login')
  logUserIn(@Body() loginUserDto: CreateUserDto) {
    return this.authService.logUser(loginUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: IRefreshToken) {
    validateRefreshToken(refreshTokenDto);
    return this.authService.refresh(refreshTokenDto);
  }
}
