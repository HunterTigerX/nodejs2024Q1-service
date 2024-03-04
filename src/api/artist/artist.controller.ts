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
import { ArtistService } from 'src/api/artist/artist.service';
import { checkUUID, notFound } from 'src/errorsAndMessages/errors';
import { isArtistDataValid } from './dto/create-artist.dto';
import { IArtist } from './interface/artist.interface';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get('artist')
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('artist/:id')
  getArtistById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.artistService.getArtistById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }

  @Post('artist')
  addArtist(@Body() data: IArtist) {
    isArtistDataValid(data);
    return this.artistService.addArtist(data);
  }

  @Put('artist/:id')
  changeArtistInDb(@Param('id') id: UUID, @Body() data: IArtist) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isArtistDataValid(data);
    return this.artistService.updateArtist(id, data);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: UUID) {
    checkUUID(id);
    return this.artistService.deleteArtist(id);
  }
}
