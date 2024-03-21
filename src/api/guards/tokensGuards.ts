import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { noAuthHeader } from 'src/errorsAndMessages/errors';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const refreshSecretKey = process.env.JWT_SECRET_REFRESH_KEY;
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      noAuthHeader('Header in the request is absent');
      return false;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      noAuthHeader(
        'Header in the request is invalid or doesn’t follow Bearer scheme',
      );
      return false;
    }

    try {
      this.jwtService.verify(parts[1], {
        secret: refreshSecretKey,
      });
      return true;
    } catch (err) {
      noAuthHeader('Refresh token has expired');
      return false;
    }
  }
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const accessSecretKey = process.env.JWT_SECRET_ACCESS_KEY;
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      noAuthHeader('Header in the request is absent');
      return false;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      noAuthHeader(
        'Header in the request is invalid or doesn’t follow Bearer scheme',
      );
      return false;
    }

    try {
      this.jwtService.verify(parts[1], {
        secret: accessSecretKey,
      });
      return true;
    } catch (err) {
      noAuthHeader('Access token has expired');
      return false;
    }
  }
}
