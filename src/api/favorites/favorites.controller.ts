import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavService } from './favorites.service';
import { checkUUID } from 'src/errorsAndMessages/errors';
import { UUID } from 'crypto';

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}
  @Get('favs')
  getAllFavorites() {
    return this.favService.getAllFavorites();
  }
  @Post('favs/track/:id')
  addFavTrack(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.favService.addFavTrack(id as UUID);
  }

  @Post('favs/artist/:id')
  addFavArtist(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.favService.addFavArtist(id as UUID);
  }

  @Post('favs/album/:id')
  addFavAlbum(@Param('id') id: string | UUID) {
    checkUUID(id);
    return this.favService.addFavAlbum(id as UUID);
  }

  @Delete('favs/track/:id')
  deleteTrackFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.favService.deleteTrackFromFav(id);
  }
  @Delete('favs/artist/:id')
  deleteArtistFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.favService.deleteArtistFromFav(id);
  }

  @Delete('favs/album/:id')
  deleteAlbumFromFav(@Param('id') id: UUID) {
    checkUUID(id);
    return this.favService.deleteAlbumFromFav(id);
  }
}
