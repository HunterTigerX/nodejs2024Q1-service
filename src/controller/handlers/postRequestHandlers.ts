import {
  IAlbum,
  IArtist,
  ICreateUserDto,
  IFavorites,
  ITrack,
} from 'src/interfaces/interface';
import { db } from 'src/main';

export function addUserToTheDb(data: ICreateUserDto) {
  const newUser = {
    login: data.login,
    password: data.password,
  };
  db.addUser(newUser);
}
export function addTrackToTheDb(data: ITrack) {
  const newTrack = {
    id: data.id,
    name: data.name,
    artistId: data.artistId,
    albumId: data.albumId,
    duration: data.duration,
  };
  db.addTrack(newTrack);
}

export function addArtistToTheDb(data: IArtist) {
  const newArtist = {
    id: data.id,
    name: data.name,
    grammy: data.grammy,
  };
  db.addArtist(newArtist);
}

export function addAlbumToTheDb(data: IAlbum) {
  const newAlbum = {
    id: data.id,
    name: data.name,
    year: data.year,
    artistId: data.artistId,
  };
  db.addAlbum(newAlbum);
}

export function addFavsToTheDb(data: IFavorites) {
  const newIFavs = {
    artists: data.artists,
    albums: data.albums,
    tracks: data.tracks,
  };
  db.addFavs(newIFavs);
}
