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
import { ConfigService } from '@nestjs/config';
import { IRefreshToken } from './interface/auth.interfaces';
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
    private configService: ConfigService,
  ) {}

  async getTokens(login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          // sub: userId,
          login,
        },
        {
          secret: accessSecretKey,
          expiresIn: accessTokenExpire,
        },
      ),
      this.jwtService.signAsync(
        {
          // sub: userId,
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

    const user = this.usersRepository2.create(createUserDto);
    await this.usersRepository2.save(user);
    return 'dto is valid, user was created';

    // const userExists = await this.usersRepository2.findOne({
    //     where: { login: createUserDto.login },
    //   });
    //   if (userExists) {
    //     throw error that user exists
    //   }
    /*
    Server should answer with status code 201 and corresponding message if dto is valid
    Server should answer with status code 400 and corresponding message if dto is invalid 
    (no login or password, or they are not a strings)
    Once POST /auth/signup accepts password property, it is replaced with hash (for example, 
    you can use bcrypt package or its equivalent like bcryptjs) for password encryption, no 
    raw passwords should be in database (NB! Password should remain hashed after any operation with service).
    */
    /*

   */
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
        const tokens = await this.getTokens(loginUserDto.login);
        returnData(tokens, 'update');
      } else {
        wrongPasswordLogin();
      }
    } else {
      wrongPasswordLogin();
    }

    /*
    Server should answer with status code 200 and tokens if dto is valid
    Server should answer with status code 400 and corresponding message if dto is invalid 
    (no login or password, or they are not a strings)
    Server should answer with status code 403 and corresponding message if authentication failed 
    (no user with such login, password doesn't match actual one, etc.)
    */
  }

  async refresh(refreshToken: IRefreshToken) {
    try {
      const isValidRefresh = this.jwtService.verify(refreshToken.refreshToken, {
        secret: refreshSecretKey,
      });
      const tokenCreatedAt = isValidRefresh.iat;
      const tokenExpireAt = isValidRefresh.exp;
      const tokenLife = (tokenExpireAt - tokenCreatedAt) / (60 * 60);
      if (tokenLife === 1) {
        console.log('This is an access token, not refresh token');
      }
      const user = this.usersRepository2.findOne({
        where: {
          login: isValidRefresh.login,
        },
      });
      if (user) {
        return this.getTokens(isValidRefresh.login);
      }
    } catch (err) {
      tokenError();
    }

    /*
    Server should answer with status code 200 and tokens in body if dto is valid
    Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    Server should answer with status code 403 and corresponding message if authentication failed 
    (Refresh token is invalid or expired)
    */
  }
}
