import {
  ICreateUserDto,
  ITrack,
  IAlbum,
  IArtist,
  IFavorites,
  IUpdatePasswordDto,
} from 'src/interfaces/interface';
import { badBody } from 'src/errorsAndMessages/errors';

export function isPostDataValid(
  obj:
    | ICreateUserDto
    | IUpdatePasswordDto
    | ITrack
    | IAlbum
    | IArtist
    | IFavorites,
  status: 'create' | 'update' | 'track' | 'artist' | 'album' | 'fav',
): void {
  let isValid = false;
  if (status === 'create') {
    if ('login' in obj && 'password' in obj) {
      isValid = true;
    }
  } else if (status === 'update') {
    if ('oldPassword' in obj && 'newPassword' in obj) {
      isValid = true;
    }
  } else if (status === 'track') {
    if (
      'id' in obj &&
      'name' in obj &&
      typeof obj.name === 'string' &&
      'artistId' in obj &&
      (typeof obj.artistId === 'string' || null) &&
      'albumId' in obj &&
      (typeof obj.albumId === 'string' || null) &&
      'duration' in obj &&
      typeof obj.albumId === 'number'
    ) {
      isValid = true;
    }
  }
  if (isValid === false) {
    badBody();
  }
}
