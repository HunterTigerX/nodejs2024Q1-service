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
import { ArtistService } from 'src/api/artist/artist.service';
import { isArtistDataValid } from './object-validation/validate-artist';
import { IArtist } from './interface/artist.interface';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
import { CustomExceptionFilter } from '../filter/exception-filter.service';
const errors = new Errors();

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get(':id')
  getArtistById(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    const result = this.artistService.getArtistById(id as UUID);
    if (result) {
      return result;
    }
    errors.notFound();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post()
  addArtist(@Body() data: IArtist) {
    isArtistDataValid(data);
    return this.artistService.addArtist(data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Put(':id')
  changeArtistInDb(@Param('id') id: UUID, @Body() data: IArtist) {
    errors.checkUUID(id);
    if (data.id) {
      errors.checkUUID(id);
    }
    isArtistDataValid(data);
    return this.artistService.updateArtist(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete(':id')
  deleteArtist(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.artistService.deleteArtist(id);
  }
}
