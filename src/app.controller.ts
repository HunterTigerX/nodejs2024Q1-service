import { UUID } from 'crypto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { checkUUID, notFound } from './errorsAndMessages/errors';
import { ICreateUserDto, IUpdatePasswordDto } from './interfaces/interface';
import { isPostUserValid } from './validation/validateObjects';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getUserById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Post('user')
  addUser(@Body() userData: ICreateUserDto) {
    isPostUserValid(userData, 'create');
    return this.appService.addUser(userData);
  }

  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() userData: IUpdatePasswordDto) {
    checkUUID(id);
    isPostUserValid(userData, 'update');
    return this.appService.updateUser(id, userData);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteUser(id);
  }
}
