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
import { AlbumService } from 'src/api/album/album.service';
import { checkUUID } from 'src/errorsAndMessages/errors';
import { IAlbum } from './interface/album.interface';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get('album')
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }
  @Get('album/:id')
  getAlbumById(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.albumService.getAlbumById(id as UUID);
  }
  @Post('album')
  addAlbum(@Body() data: IAlbum) {
    return this.albumService.addAlbum(data);
  }

  @Put('album/:id')
  changeAlbumsInDb(@Param('id') id: UUID, @Body() data: IAlbum) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    return this.albumService.updateAlbum(id, data);
  }
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: UUID) {
    checkUUID(id);
    return this.albumService.deleteAlbum(id);
  }
}
