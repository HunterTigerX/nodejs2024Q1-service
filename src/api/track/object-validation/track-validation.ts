import { ITrack } from '../interface/track.interface';
import { Errors } from 'src/errorsAndMessages/errors';
const errors = new Errors();

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
    errors.badBody();
  }
}
