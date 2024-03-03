import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getAllTracksFromDb,
  getTrackByIdFromDb,
  getAllArtistsFromDb,
  getArtistByIdFromDb,
  getAllAlbumsFromDb,
  getAlbumByIdFromDb,
  getAllFavoritesFromDb,
  getFavoriteByArrayFromDb,
} from './controller/handlers/getRequestHandlers';
import {
  addUserToTheDb,
  addTrackToTheDb,
  addAlbumToTheDb,
  addArtistToTheDb,
  addFavsToTheDb,
} from './controller/handlers/postRequestHandlers';
import {
  updateUserInTheDb,
  updateTrackInTheDb,
  updateAlbumInTheDb,
  updateArtistInTheDb,
  updateFavInTheDb,
} from './controller/handlers/putRequestHandlers';
import {
  removeUserFromDb,
  removeTrackFromDb,
  removeAlbumFromDb,
  removeArtistFromDb,
  removeFavsFromDb,
} from './controller/handlers/deleteRequestHandlers';
import {
  ICreateUserDto,
  ITrack,
  IUpdatePasswordDto,
  IAlbum,
  IArtist,
  IFavorites,
} from './interfaces/interface';
@Injectable()
export class AppService {
  getAllUsers() {
    return getAllUsersFromDb();
  }
  getAllTracks() {
    return getAllTracksFromDb();
  }
  getAllArtists() {
    return getAllArtistsFromDb();
  }
  getAllAlbums() {
    return getAllAlbumsFromDb();
  }
  getAllFavorites() {
    return getAllFavoritesFromDb();
  }
  // get all - 5/5

  getUserById(id: UUID) {
    return getUserByIdFromDb(id);
  }
  getTrackById(id: UUID) {
    return getTrackByIdFromDb(id);
  }
  getAlbumById(id: UUID) {
    return getAlbumByIdFromDb(id);
  }
  getArtistById(id: UUID) {
    return getArtistByIdFromDb(id);
  }
  getFavoriteByArray(id: UUID) {
    return getFavoriteByArrayFromDb(['asdasd']);
  }
  // get by - 5/5

  addUser(userData: ICreateUserDto) {
    addUserToTheDb(userData);
  }
  addTrack(trackData: ITrack) {
    addTrackToTheDb(trackData);
  }
  addArtist(artistData: IArtist) {
    addArtistToTheDb(artistData);
  }
  addAlbum(albumData: IAlbum) {
    addAlbumToTheDb(albumData);
  }
  addFavs(favData: IFavorites) {
    addFavsToTheDb(favData);
  }
  // add - 5/5

  updateUser(id: UUID, userData: IUpdatePasswordDto) {
    updateUserInTheDb(id, userData);
  }
  updateTrack(id: UUID, userData: ITrack) {
    updateTrackInTheDb(id, userData);
  }
  updateArtist(id: UUID, userData: IArtist) {
    updateArtistInTheDb(id, userData);
  }
  updateAlbum(id: UUID, userData: IAlbum) {
    updateAlbumInTheDb(id, userData);
  }
  updateFavs(id: UUID, userData: IFavorites) {
    updateFavInTheDb(id, userData);
  }
  // update - 5/5

  deleteUser(id: UUID) {
    removeUserFromDb(id);
  }
  deleteTrack(id: UUID) {
    removeTrackFromDb(id);
  }
  deleteArtist(id: UUID) {
    removeArtistFromDb(id);
  }
  deleteAlbum(id: UUID) {
    removeAlbumFromDb(id);
  }
  deleteFavorite(id: UUID) {
    removeFavsFromDb(id);
  }
  // delete - 5/5
}
