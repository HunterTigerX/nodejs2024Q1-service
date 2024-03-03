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
import {
  ICreateUserDto,
  ITrack,
  IUpdatePasswordDto,
} from './interfaces/interface';
import { isPostDataValid } from './validation/validateObjects';

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
    isPostDataValid(userData, 'create');
    return this.appService.addUser(userData);
  }
  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() userData: IUpdatePasswordDto) {
    checkUUID(id);
    isPostDataValid(userData, 'update');
    return this.appService.updateUser(id, userData);
  }
  @Delete('user/:id')
  deleteUser(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteUser(id);
  }

  @Get('track')
  getAllTracks() {
    return this.appService.getAllTracks();
  }
  @Get('track/:id')
  getTrackById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getTrackById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }
  @Post('track')
  addTrack(@Body() userData: ITrack) {
    isPostDataValid(userData, 'track');
    return this.appService.addTrack(userData);
  }
  @Put('track/:id')
  changeTrackInDb(@Param('id') id: UUID, @Body() trackData: ITrack) {
    checkUUID(id);
    isPostDataValid(trackData, 'update');
    return this.appService.updateTrack(id, trackData);
  }
  @Delete('track/:id')
  deleteTrack(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteTrack(id);
  }

  @Get('artist')
  getAllArtists() {
    return this.appService.getAllArtists();
  }
  @Get('artist/:id')
  getArtistById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getArtistById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Get('album')
  getAllAlbums() {
    return this.appService.getAllAlbums();
  }
  @Get('album/:id')
  getAlbumById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getAlbumById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Get('favs')
  getAllFavorites() {
    return this.appService.getAllFavorites();
  }
  @Get('favs/:id')
  getFavoriteByArray(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getFavoriteByArray(id as UUID);
    // if (result) {
    //   return result;
    // }
    return notFound();
  }
}
