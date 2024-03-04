import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { db } from 'src/main';
import { ITrack } from './interface/track.interface';

@Injectable()
export class TrackService {
  getAllTracks() {
    const tracks = db.getAllTracks();
    return tracks;
  }
  getTrackById(id: UUID) {
    const track = db.getTrackById(id);
    return track;
  }
  addTrack(data: ITrack) {
    const newUUID = randomUUID();
    const newTrack = {
      id: newUUID,
      name: data.name,
      artistId: data.artistId,
      albumId: data.albumId,
      duration: data.duration,
    };
    db.addTrack(newTrack);
  }
  updateTrack(id: UUID, data: ITrack) {
    db.updateTrack(id, data);
  }
  deleteTrack(id: UUID) {
    db.removeTrackFromDb(id);
  }
}
