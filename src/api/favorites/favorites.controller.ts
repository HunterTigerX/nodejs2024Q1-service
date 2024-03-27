import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { FavService } from './favorites.service';
import { UUID } from 'crypto';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
import { CustomExceptionFilter } from '../filter/exception-filter.service';
const errors = new Errors();

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}
  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get('favs')
  getAllFavorites() {
    return this.favService.getAllFavorites();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('favs/track/:id')
  addFavTrack(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavTrack(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('favs/artist/:id')
  addFavArtist(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavArtist(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('favs/album/:id')
  addFavAlbum(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavAlbum(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete('favs/track/:id')
  deleteTrackFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteTrackFromFav(id);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete('favs/artist/:id')
  deleteArtistFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteArtistFromFav(id);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete('favs/album/:id')
  deleteAlbumFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteAlbumFromFav(id);
  }
}
