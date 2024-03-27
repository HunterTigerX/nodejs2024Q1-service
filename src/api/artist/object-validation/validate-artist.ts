import { IArtist } from '../interface/artist.interface';
import { Errors } from 'src/errorsAndMessages/errors';
const errors = new Errors();
export function isArtistDataValid(obj: IArtist) {
  const isValid =
    'name' in obj &&
    'grammy' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.grammy === 'boolean';
  if (!isValid) {
    errors.badBody();
  }
}
