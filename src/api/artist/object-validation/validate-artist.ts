import { badBody } from 'src/errorsAndMessages/errors';
import { IArtist } from '../interface/artist.interface';

export function isArtistDataValid(obj: IArtist) {
  const isValid =
    'name' in obj &&
    'grammy' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.grammy === 'boolean';
  if (!isValid) {
    badBody();
  }
}
