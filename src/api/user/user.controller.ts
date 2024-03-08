import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { ICreateUserDto, IUpdatePasswordDto } from './interface/user.interface';
import { UserService } from './user.service';
import { isUserDataValid } from './object-validation/user-validation';
import { checkUUID, notFound } from 'src/errorsAndMessages/errors';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.userService.getUserById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Post('user')
  addUser(@Body() data: ICreateUserDto) {
    isUserDataValid(data, 'userCreate');
    return this.userService.addUser(data);
  }
  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() data: IUpdatePasswordDto) {
    checkUUID(id);
    isUserDataValid(data, 'userUpdate');
    return this.userService.updateUser(id, data);
  }
  @Delete('user/:id')
  deleteUser(@Param('id') id: UUID) {
    checkUUID(id);
    return this.userService.deleteUser(id);
  }
}
