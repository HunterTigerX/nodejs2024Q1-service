import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { ITrack } from './interface/track.interface';
import { Tracks } from './entities/track.entity';
import { Repository } from 'typeorm';
import { isTrackDataValid } from './object-validation/track-validation';
import { InjectRepository } from '@nestjs/typeorm';
import { FavTracks } from '../favorites/entities/favorites.entity';
import { Errors, Messages } from 'src/errorsAndMessages/errors';
import { LoggingService } from '../logger/logger.service';
const errors = new Errors();
const message = new Messages();

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Tracks)
    private readonly tracksRepository: Repository<Tracks>,
    @InjectRepository(FavTracks)
    private readonly favTracksRepository: Repository<FavTracks>,
    private readonly logger: LoggingService,
  ) {}

  async getAllTracks() {
    const tracks = await this.tracksRepository.find();
    return tracks;
  }
  async getTrackById(id: UUID) {
    const track = await this.tracksRepository.findOne({
      where: { id },
    });
    if (track) {
      return track;
    }
    errors.notFound();
  }
  async addTrack(data: ITrack) {
    isTrackDataValid(data);
    const newUUID = randomUUID(); // If there is an id in body it doesn't matter
    const newTrack = {
      id: newUUID,
      name: data.name,
      artistId: data.artistId,
      albumId: data.albumId,
      duration: data.duration,
    };
    const tracks = this.tracksRepository.create(newTrack);
    await this.tracksRepository.save(tracks);
    message.returnCreatedData(newTrack);
  }
  async updateTrack(id: UUID, data: ITrack) {
    isTrackDataValid(data);
    const trackToChange = await this.tracksRepository.findOne({
      where: { id },
    });
    if (trackToChange) {
      trackToChange.name = data.name;
      trackToChange.artistId = data.artistId;
      trackToChange.albumId = data.albumId;
      trackToChange.duration = data.duration;
      await this.tracksRepository.save(trackToChange);
      message.returnUpdatedData(trackToChange);
    } else {
      errors.notFound();
    }
  }

  async deleteTrack(id: UUID) {
    const trackToDelete = await this.tracksRepository.findOne({
      where: { id },
    });
    if (trackToDelete) {
      await this.tracksRepository.remove(trackToDelete);
      const favTrackToDelete = await this.favTracksRepository.findOne({
        where: { id },
      });
      if (favTrackToDelete) {
        await this.favTracksRepository.remove(favTrackToDelete);
      }
      message.successDeletion();
    } else {
      errors.notFound();
    }
  }
}
