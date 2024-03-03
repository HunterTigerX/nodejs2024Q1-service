import { UUID } from 'crypto';

export interface INewUser {
  login: string;
  password: string;
}

export interface IUser extends INewUser {
  id: UUID;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IArtist {
  id: UUID;
  name: string;
  grammy: boolean;
}

export interface ITrack {
  id: UUID;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface IAlbum {
  id: UUID;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface IFavorites {
  artists: UUID[]; // favorite artists ids
  albums: UUID[]; // favorite albums ids
  tracks: UUID[]; // favorite tracks ids
}

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
