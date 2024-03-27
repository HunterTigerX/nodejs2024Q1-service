import { IAlbum } from '../interface/album.interface';
import { Errors } from 'src/errorsAndMessages/errors';
const errors = new Errors();

export function isAlbumDataValid(obj: IAlbum) {
  const isValid: boolean =
    'name' in obj &&
    'year' in obj &&
    'artistId' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.year === 'number' &&
    (typeof obj.artistId === 'string' || obj.artistId === null);
  if (!isValid) {
    errors.badBody();
  }
}
