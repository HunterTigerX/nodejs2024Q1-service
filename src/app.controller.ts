import { UUID } from 'crypto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Param,
  Body,
  Res,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { checkUUID, notFound } from './errors/errors';
import { db } from './main';
import { ICreateUserDto, IUpdatePasswordDto } from './interfaces/interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string | UUID, @Res() res: Response) {
    checkUUID(id);
    const result = this.appService.getUserById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Post()
  addUserToTheDb(@Body() userData: ICreateUserDto) {
    console.log('hello');
    return this.appService.addUserToTheDb(userData);
  }

  @Put(':id')
  changeUserInDb(@Param('id') id: UUID, @Body() userData: any) {
    return this.appService.changeUserInDb(id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: UUID) {
    return this.appService.deleteUser(id);
  }
}
