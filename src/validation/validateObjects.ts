import {
  ICreateUserDto,
  ITrack,
  IAlbum,
  IArtist,
  IFavorites,
  IUpdatePasswordDto,
} from 'src/interfaces/interface';
import { badBody } from 'src/errorsAndMessages/errors';

function isArrayOfStrings(arr: any[]): arr is string[] {
  return arr.every((item) => typeof item === 'string');
}

export function isPostDataValid(
  obj:
    | ICreateUserDto
    | IUpdatePasswordDto
    | ITrack
    | IAlbum
    | IArtist
    | IFavorites,
  status: 'userCreate' | 'userUpdate' | 'track' | 'artist' | 'album' | 'fav',
): void {
  let isValid = false;
  if (status === 'userCreate') {
    if (
      'login' in obj &&
      'password' in obj &&
      typeof obj.login === 'string' &&
      typeof obj.password === 'string'
    ) {
      isValid = true;
    }
  } else if (status === 'userUpdate') {
    if (
      'oldPassword' in obj &&
      'newPassword' in obj &&
      typeof obj.newPassword === 'string' &&
      typeof obj.newPassword === 'string'
    ) {
      isValid = true;
    }
  } else if (status === 'track') {
    if (
      'name' in obj &&
      typeof obj.name === 'string' &&
      'artistId' in obj &&
      (typeof obj.artistId === 'string' || 'null') &&
      'albumId' in obj &&
      (typeof obj.albumId === 'string' || 'null') &&
      'duration' in obj &&
      typeof obj.duration === 'number'
    ) {
      isValid = true;
    }
  } else if (status === 'artist') {
    if (
      'name' in obj &&
      'grammy' in obj &&
      typeof obj.name === 'string' &&
      typeof obj.grammy === 'boolean'
    ) {
      isValid = true;
    }
  } else if (status === 'album') {
    if (
      'name' in obj &&
      'year' in obj &&
      'artistId' in obj &&
      typeof obj.name === 'string' &&
      typeof obj.year === 'number' &&
      (typeof obj.artistId === 'string' || 'null')
    ) {
      isValid = true;
    }
  } else if (status === 'fav') {
    if (
      'artists' in obj &&
      'albums' in obj &&
      'tracks' in obj &&
      isArrayOfStrings(obj.artists) &&
      isArrayOfStrings(obj.albums) &&
      isArrayOfStrings(obj.tracks)
    ) {
      isValid = true;
    }
  }
  if (isValid === false) {
    badBody();
  }
}
