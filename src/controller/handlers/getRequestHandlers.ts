import { db } from 'src/main';
import { UUID } from 'crypto';
import { IArtist, ITrack, IUser, IAlbum } from 'src/interfaces/interface';

export function getAllUsersFromDb() {
  const users = db.getAllUsers();
  return users;
}

export function getUserByIdFromDb(id: UUID): IUser | undefined {
  const user = db.getUserById(id);
  return user;
}

export function getAllTracksFromDb() {
  const tracks = db.getAllTracks();
  return tracks;
}

export function getTrackByIdFromDb(id: UUID): ITrack | undefined {
  const track = db.getTrackById(id);
  return track;
}

export function getAllArtistsFromDb() {
  const tracks = db.getAllArtists();
  return tracks;
}

export function getArtistByIdFromDb(id: UUID): IArtist | undefined {
  const artist = db.getArtistById(id);
  return artist;
}

export function getAllAlbumsFromDb() {
  const albums = db.getAllAlbums();
  return albums;
}

export function getAlbumByIdFromDb(id: UUID): IAlbum | undefined {
  const album = db.getAlbumById(id);
  return album;
}

export function getAllFavoritesFromDb() {
  const favorites = db.getAllFavorites();
  return favorites;
}

export function getFavoriteByArrayFromDb(array: string[]) {
  const favorite = db.getFavoriteByArray(array);
  return favorite;
}
