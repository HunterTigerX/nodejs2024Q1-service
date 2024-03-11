import { badBody } from 'src/errorsAndMessages/errors';
import { ITrack } from '../interface/track.interface';

export function isTrackDataValid(obj: ITrack) {
  const isValid =
    'name' in obj &&
    typeof obj.name === 'string' &&
    'artistid' in obj &&
    (typeof obj.artistid === 'string' || 'null') &&
    'albumid' in obj &&
    (typeof obj.albumid === 'string' || 'null') &&
    'duration' in obj &&
    typeof obj.duration === 'number';
  if (!isValid) {
    badBody();
  }
}
