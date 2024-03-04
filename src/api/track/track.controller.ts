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
import { checkUUID, notFound } from 'src/errorsAndMessages/errors';
import { isTrackDataValid } from './dto/create-track.dto';
import { ITrack } from './interface/track.interface';
import { TrackService } from './track.service';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('track')
  getAllTracks() {
    return this.trackService.getAllTracks();
  }
  @Get('track/:id')
  getTrackById(@Param('id') id: string | UUID) {
    checkUUID(id);
    const result = this.trackService.getTrackById(id as UUID);
    if (result) {
      return result;
    }
    return notFound();
  }
  @Post('track')
  addTrack(@Body() data: ITrack) {
    isTrackDataValid(data);
    return this.trackService.addTrack(data);
  }
  @Put('track/:id')
  changeTrackInDb(@Param('id') id: UUID, @Body() data: ITrack) {
    checkUUID(id);
    if (data.id) {
      checkUUID(id);
    }
    isTrackDataValid(data);
    return this.trackService.updateTrack(id, data);
  }
  @Delete('track/:id')
  deleteTrack(@Param('id') id: UUID) {
    checkUUID(id);
    return this.trackService.deleteTrack(id);
  }
}
