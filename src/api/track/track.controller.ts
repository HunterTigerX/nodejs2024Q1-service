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
import { isTrackDataValid } from './object-validation/track-validation';
import { ITrack } from './interface/track.interface';
import { TrackService } from './track.service';
import { AccessTokenGuard } from '../guards/tokensGuards';
import { Errors } from 'src/errorsAndMessages/errors';
import { CustomExceptionFilter } from '../filter/exception-filter.service';
const errors = new Errors();

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get('track')
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Get('track/:id')
  getTrackById(@Param('id') id: string | UUID) {
    errors.checkUUID(id);
    const result = this.trackService.getTrackById(id as UUID);
    if (result) {
      return result;
    }
    errors.notFound();
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Post('track')
  addTrack(@Body() data: ITrack) {
    isTrackDataValid(data);
    return this.trackService.addTrack(data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Put('track/:id')
  changeTrackInDb(@Param('id') id: UUID, @Body() data: ITrack) {
    errors.checkUUID(id);
    if (data.id) {
      errors.checkUUID(id);
    }
    isTrackDataValid(data);
    return this.trackService.updateTrack(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(CustomExceptionFilter)
  @Delete('track/:id')
  deleteTrack(@Param('id') id: UUID) {
    errors.checkUUID(id);
    return this.trackService.deleteTrack(id);
  }
}
