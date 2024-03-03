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
  // get id 4/4

  @Post('user')
  addUser(@Body() data: ICreateUserDto) {
    isPostDataValid(data, 'userCreate');
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
  @Post('album')
  addAlbum(@Body() data: IAlbum) {
    isPostDataValid(data, 'album');
    return this.appService.addAlbum(data);
  }
  @Post('favs/track/:id')
  addFavTrack(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.appService.addFav(id as UUID, 'track');
  }
  @Post('favs/album/:id')
  addFavAlbum(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.appService.addFav(id as UUID, 'album');
  }
  @Post('favs/artist/:id')
  addFavArtist(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.appService.addFav(id as UUID, 'artist');
  }
  // post 7/7

  @Put('user/:id')
  changeUserInDb(@Param('id') id: UUID, @Body() data: IUpdatePasswordDto) {
    checkUUID(id);
    isPostDataValid(data, 'userUpdate');
    return this.appService.updateUser(id, data);
  }
  @Put('track/:id')
  changeTrackInDb(@Param('id') id: UUID, @Body() data: ITrack) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isPostDataValid(data, 'track');
    return this.appService.updateTrack(id, data);
  }
  @Put('artist/:id')
  changeArtistInDb(@Param('id') id: UUID, @Body() data: IArtist) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isPostDataValid(data, 'artist');
    return this.appService.updateArtist(id, data);
  }
  @Put('album/:id')
  changeAlbumsInDb(@Param('id') id: UUID, @Body() data: IAlbum) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isPostDataValid(data, 'album');
    return this.appService.updateAlbum(id, data);
  }
  // put 4/4
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
  @Delete('favs/track/:id')
  deleteTrackFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteFromFav(id, 'track');
  }
  @Delete('favs/artist/:id')
  deleteArtistFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteFromFav(id, 'artist');
  }
  @Delete('favs/album/:id')
  deleteAlbumFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.appService.deleteFromFav(id, 'album');
  }
  // delete 4/7
}
