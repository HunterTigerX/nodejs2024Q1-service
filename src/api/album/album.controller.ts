import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { AlbumService } from 'src/api/album/album.service';
import { IAlbum } from './interface/album.interface';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
import { CustomExceptionFilter } from '../filter/exception-filter.service';
const errors = new Errors();

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get('album')
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get('album/:id')
  getAlbumById(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.albumService.getAlbumById(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('album')
  addAlbum(@Body() data: IAlbum) {
    return this.albumService.addAlbum(data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Put('album/:id')
  changeAlbumsInDb(@Param('id') id: UUID, @Body() data: IAlbum) {
    errors.checkUUID(id);
    if (data.id) {
      errors.checkUUID(id);
    }
    return this.albumService.updateAlbum(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.albumService.deleteAlbum(id);
  }
}
