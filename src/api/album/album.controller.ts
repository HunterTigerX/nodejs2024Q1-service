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
import { AlbumService } from 'src/api/album/album.service';
import { checkUUID } from 'src/errorsAndMessages/errors';
import { IAlbum } from './interface/album.interface';
import { AccessTokenGuard } from '../guards/tokensGuards';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @UseGuards(AccessTokenGuard)
  @Get('album')
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @UseGuards(AccessTokenGuard)
  @Get('album/:id')
  getAlbumById(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.albumService.getAlbumById(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @Post('album')
  addAlbum(@Body() data: IAlbum) {
    return this.albumService.addAlbum(data);
  }

  @UseGuards(AccessTokenGuard)
  @Put('album/:id')
  changeAlbumsInDb(@Param('id') id: UUID, @Body() data: IAlbum) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    return this.albumService.updateAlbum(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: UUID) {
    checkUUID(id);
    return this.albumService.deleteAlbum(id);
  }
}
