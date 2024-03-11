import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import {
  ICreateUserDto,
  IUser,
  IUpdatePasswordDto,
} from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  notFound,
  returnData,
  successDeletion,
  wrongPassword,
} from 'src/errorsAndMessages/errors';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { isUserDataValid } from './object-validation/user-validation';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
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
    return notFound();
  }

  async addUser(data: ICreateUserDto) {
    const newUUID = randomUUID();
    const timeStamp = Date.now();
    const newUser: IUser = {
      login: data.login,
      password: data.password,
      version: 1,
      id: newUUID,
      createdat: timeStamp,
      updatedat: timeStamp,
    };
    const user = this.usersRepository.create(newUser);
    await this.usersRepository.save(user);

    const copy = JSON.parse(JSON.stringify(user));
    delete copy.password;
    return returnData(copy, 'create');
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
        userToChange.createdat = +userToChange.createdat;
        userToChange.updatedat = timeStamp;
        await this.usersRepository.save(userToChange);
        const copy = JSON.parse(JSON.stringify(userToChange));
        delete copy.password;
        return returnData(copy, 'update');
      } else {
        wrongPassword();
      }
    } else {
      notFound();
    }
  }

  async deleteUser(id: UUID) {
    const userToDelete = await this.usersRepository.findOne({
      where: { id },
    });
    if (userToDelete) {
      await this.usersRepository.remove(userToDelete);
      successDeletion();
    } else {
      notFound();
    }
  }
}
