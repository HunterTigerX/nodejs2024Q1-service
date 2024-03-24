import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FavService } from './favorites.service';
import { UUID } from 'crypto';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
const errors = new Errors();

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}
  @UseGuards(AccessTokenGuard)
  @Get('favs')
  getAllFavorites() {
    return this.favService.getAllFavorites();
  }

  @UseGuards(AccessTokenGuard)
  @Post('favs/track/:id')
  addFavTrack(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavTrack(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @Post('favs/artist/:id')
  addFavArtist(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavArtist(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @Post('favs/album/:id')
  addFavAlbum(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    return this.favService.addFavAlbum(id as UUID);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('favs/track/:id')
  deleteTrackFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteTrackFromFav(id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('favs/artist/:id')
  deleteArtistFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteArtistFromFav(id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('favs/album/:id')
  deleteAlbumFromFav(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.favService.deleteAlbumFromFav(id);
  }
}
