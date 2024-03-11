import { badBody } from 'src/errorsAndMessages/errors';
import { IAlbum } from '../interface/album.interface';

export function isAlbumDataValid(obj: IAlbum) {
  const isValid: boolean =
    'name' in obj &&
    'year' in obj &&
    'artistId' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.year === 'number' &&
    (typeof obj.artistId === 'string' || obj.artistId === null);
  if (!isValid) {
    badBody();
  }
}
