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
import { ArtistService } from 'src/api/artist/artist.service';
import { checkUUID, notFound } from 'src/errorsAndMessages/errors';
import { isArtistDataValid } from './object-validation/validate-artist';
import { IArtist } from './interface/artist.interface';
import { AccessTokenGuard } from '../guards/tokensGuards';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @UseGuards(AccessTokenGuard)
  @Get('artist')
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @UseGuards(AccessTokenGuard)
  @Get('artist/:id')
  getArtistById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.artistService.getArtistById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @UseGuards(AccessTokenGuard)
  @Post('artist')
  addArtist(@Body() data: IArtist) {
    isArtistDataValid(data);
    return this.artistService.addArtist(data);
  }

  @UseGuards(AccessTokenGuard)
  @Put('artist/:id')
  changeArtistInDb(@Param('id') id: UUID, @Body() data: IArtist) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isArtistDataValid(data);
    return this.artistService.updateArtist(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('artist/:id')
  deleteArtist(@Param('id') id: UUID) {
    checkUUID(id);
    return this.artistService.deleteArtist(id);
  }
}
