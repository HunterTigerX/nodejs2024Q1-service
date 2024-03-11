import { badBody } from 'src/errorsAndMessages/errors';
import { IAlbum } from '../interface/album.interface';

export function isAlbumDataValid(obj: IAlbum) {
  const isValid: boolean =
    'name' in obj &&
    'year' in obj &&
    'artistid' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.year === 'number' &&
    (typeof obj.artistid === 'string' || obj.artistid === null);
  if (!isValid) {
    badBody();
  }
}
