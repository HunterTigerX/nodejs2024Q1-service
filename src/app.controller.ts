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
  IArtist,
  ICreateUserDto,
  ITrack,
  IUpdatePasswordDto,
  IAlbum,
  IFavorites,
} from './interfaces/interface';
import { isPostDataValid } from './validation/validateObjects';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getAllUsers() {
    return this.appService.getAllUsers();
  }
  @Get('track')
  getAllTracks() {
    return this.appService.getAllTracks();
  }
  @Get('artist')
  getAllArtists() {
    return this.appService.getAllArtists();
  }
  @Get('album')
  getAllAlbums() {
    return this.appService.getAllAlbums();
  }
  @Get('favs')
  getAllFavorites() {
    return this.appService.getAllFavorites();
  }
  // Get 5/5
  @Get('user/:id')
  getUserById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getUserById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
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
  @Get('artist/:id')
  getArtistById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getArtistById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
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
  @Get('favs/:id')
  getFavoriteByArray(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.appService.getFavoriteByArray(id as UUID);
    // if (result) {
    //   return result;
    // }
    return notFound();
  }
  // get id 4/5
  @Post('user')
  addUser(@Body() data: ICreateUserDto) {
    isPostDataValid(data, 'create');
    return this.appService.addUser(data);
  }
  @Post('track')
  addTrack(@Body() data: ITrack) {
    isPostDataValid(data, 'track');
    return this.appService.addTrack(data);
  }
  @Post('artist')
  addArtist(@Body() data: IArtist) {
    isPostDataValid(data, 'artist');
    return this.appService.addArtist(data);
  }
  @Post('artist')
  addAlbum(@Body() data: IAlbum) {
    isPostDataValid(data, 'artist');
    return this.appService.addAlbum(data);
  }
  // post 4/5
  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() data: IUpdatePasswordDto) {
    checkUUID(id);
    isPostDataValid(data, 'update');
    return this.appService.updateUser(id, data);
  }
  @Put('track/:id')
  changeTrackInDb(@Param('id') id: UUID, @Body() data: ITrack) {
    checkUUID(id);
    isPostDataValid(data, 'update');
    return this.appService.updateTrack(id, data);
  }
  @Put('artist/:id')
  changeArtistInDb(@Param('id') id: UUID, @Body() data: IArtist) {
    checkUUID(id);
    isPostDataValid(data, 'update');
    return this.appService.updateArtist(id, data);
  }
  @Put('album/:id')
  changeAlbumsInDb(@Param('id') id: UUID, @Body() data: IAlbum) {
    checkUUID(id);
    isPostDataValid(data, 'update');
    return this.appService.updateAlbum(id, data);
  }
  // put 4/5
  @Delete('user/:id')
  deleteUser(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteUser(id);
  }
  @Delete('track/:id')
  deleteTrack(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteTrack(id);
  }
  @Delete('artist/:id')
  deleteArtist(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteArtist(id);
  }
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteAlbum(id);
  }
  // delete 4/5
}
