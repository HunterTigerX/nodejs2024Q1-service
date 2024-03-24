import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import {
  ICreateUserDto,
  IUserSmall,
  IUpdatePasswordDto,
} from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { isUserDataValid } from './object-validation/user-validation';
import { Errors, Messages } from 'src/errorsAndMessages/errors';
import { LoggingService } from '../logger/logger.service';
const errors = new Errors();
const message = new Messages();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly logger: LoggingService,
  ) {}
  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: UUID) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user) {
      return user;
    }
    errors.notFound();
  }

  async addUser(data: ICreateUserDto) {
    const newUUID = randomUUID();
    const timeStamp = Date.now();
    const newUser: IUserSmall = {
      login: data.login,
      password: data.password,
      version: 1,
      id: newUUID,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    const user = this.usersRepository.create(newUser);
    await this.usersRepository.save(user);

    const copy = JSON.parse(JSON.stringify(user));
    delete copy.password;
    message.returnCreatedData(copy);
  }

  async updateUser(id: UUID, data: IUpdatePasswordDto) {
    isUserDataValid(data, 'userUpdate');
    const userToChange = await this.usersRepository.findOne({
      where: { id },
    });
    if (userToChange) {
      if (userToChange.password === data.oldPassword) {
        const timeStamp = Date.now();
        userToChange.password = data.newPassword;
        userToChange.version += 1;
        userToChange.createdAt = +userToChange.createdAt;
        userToChange.updatedAt = timeStamp;
        await this.usersRepository.save(userToChange);
        const copy = JSON.parse(JSON.stringify(userToChange));
        delete copy.password;
        message.returnUpdatedData(copy);
      } else {
        errors.forbiddenError('Password mismatch. Old password is wrong');
      }
    } else {
      errors.notFound();
    }
  }

  async deleteUser(id: UUID) {
    const userToDelete = await this.usersRepository.findOne({
      where: { id },
    });
    if (userToDelete) {
      await this.usersRepository.remove(userToDelete);
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }
}
