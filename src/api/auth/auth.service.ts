import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ICreateUserDto } from '../user/interface/user.interface';
import { Auth } from './entities/auth.entity';
import {
  returnData,
  tokenError,
  wrongPasswordLogin,
} from 'src/errorsAndMessages/errors';
import * as dotenv from 'dotenv';
import {
  IRefreshToken,
  ITokens,
  IUserTokens,
} from './interface/auth.interfaces';
import { randomUUID } from 'crypto';
dotenv.config();

const accessSecretKey = process.env.JWT_SECRET_ACCESS_KEY;
const refreshSecretKey = process.env.JWT_SECRET_REFRESH_KEY;
const accessTokenExpire = process.env.TOKEN_ACCESS_EXPIRE_TIME;
const refreshTokenExpire = process.env.TOKEN_REFRESH_EXPIRE_TIME;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly usersRepository2: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async getTokens(login: string, userId: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          secret: accessSecretKey,
          expiresIn: accessTokenExpire,
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          secret: refreshSecretKey,
          expiresIn: refreshTokenExpire,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUser(createUserDto: ICreateUserDto) {
    const cryptSalt = process.env.CRYPT_SALT;
    const salt = await bcrypt.genSalt(+cryptSalt);
    const encryptedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = encryptedPassword;

    const newUUID = randomUUID();
    const newUser: IUserTokens = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: newUUID,
      accessToken: null,
      refreshToken: null,
    };

    await this.usersRepository2.save(newUser);
    const copy = JSON.parse(JSON.stringify(newUser));
    delete copy.password;
    returnData(copy, 'create');
  }

  async logUser(loginUserDto: ICreateUserDto) {
    const userExists = await this.usersRepository2.findOne({
      where: { login: loginUserDto.login },
    });
    if (userExists) {
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        userExists.password,
      );
      if (isPasswordValid) {
        const userId = userExists.id;
        const tokens = await this.getTokens(loginUserDto.login, userId);
        userExists.accessToken = tokens.accessToken;
        userExists.refreshToken = tokens.refreshToken;
        await this.usersRepository2.save(userExists);
        returnData(tokens, 'update');
      } else {
        wrongPasswordLogin();
      }
    } else {
      wrongPasswordLogin();
    }
  }

  async refresh(refreshToken: IRefreshToken) {
    let newTokens: ITokens;
    try {
      const isValidRefresh = this.jwtService.verify(refreshToken.refreshToken, {
        secret: refreshSecretKey,
      });
      const tokenCreatedAt = isValidRefresh.iat;
      const tokenExpireAt = isValidRefresh.exp;
      const tokenLife = (tokenExpireAt - tokenCreatedAt) / (60 * 60);
      if (tokenLife === 1) {
        tokenError('This is not a refresh token');
      }
      if (tokenExpireAt < (new Date().getTime() + 1) / 1000) {
        return tokenError('');
      }
      const user = await this.usersRepository2.findOne({
        where: {
          login: isValidRefresh.login,
        },
      });
      if (user) {
        newTokens = await this.getTokens(isValidRefresh.login, user.id);
      }
    } catch (err) {
      tokenError('Refresh token is invalid or expired');
    }
    returnData(newTokens, 'update');
  }
}
