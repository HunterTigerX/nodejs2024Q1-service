import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { ICreateUserDto, IUpdatePasswordDto } from './interface/user.interface';
import { UserService } from './user.service';
import { isUserDataValid } from './object-validation/user-validation';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
const errors = new Errors();
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AccessTokenGuard)
  @Get('user')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get('user/:id')
  getUserById(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    const result = this.userService.getUserById(id as UUID);
    if (result) {
      return result;
    }
    errors.notFound();
  }

  @UseGuards(AccessTokenGuard)
  @Post('user')
  addUser(@Body() data: ICreateUserDto) {
    isUserDataValid(data, 'userCreate');
    return this.userService.addUser(data);
  }

  @UseGuards(AccessTokenGuard)
  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() data: IUpdatePasswordDto) {
    errors.checkUUID(id);
    isUserDataValid(data, 'userUpdate');
    return this.userService.updateUser(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.userService.deleteUser(id);
  }
}
