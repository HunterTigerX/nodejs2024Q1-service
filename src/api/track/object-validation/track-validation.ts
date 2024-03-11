import { badBody } from 'src/errorsAndMessages/errors';
import { ITrack } from '../interface/track.interface';

export function isTrackDataValid(obj: ITrack) {
  const isValid =
    'name' in obj &&
    typeof obj.name === 'string' &&
    'artistId' in obj &&
    (typeof obj.artistId === 'string' || 'null') &&
    'albumId' in obj &&
    (typeof obj.albumId === 'string' || 'null') &&
    'duration' in obj &&
    typeof obj.duration === 'number';
  if (!isValid) {
    badBody();
  }
}
