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
} from './controller/handlers/postRequestHandlers';
import { updateUserInTheDb } from './controller/handlers/putRequestHandlers';
import { removeUserFromDb } from './controller/handlers/deleteRequestHandlers';
import {
  ICreateUserDto,
  ITrack,
  IUpdatePasswordDto,
} from './interfaces/interface';
@Injectable()
export class AppService {
  getAllUsers() {
    return getAllUsersFromDb();
  }
  getUserById(id: UUID) {
    return getUserByIdFromDb(id);
  }
  addUser(userData: ICreateUserDto) {
    addUserToTheDb(userData);
  }
  updateUser(id: UUID, userData: IUpdatePasswordDto) {
    updateUserInTheDb(id, userData);
  }
  deleteUser(id: UUID) {
    removeUserFromDb(id);
  }
  getAllTracks() {
    return getAllTracksFromDb();
  }
  getTrackById(id: UUID) {
    return getTrackByIdFromDb(id);
  }
  addTrack(trackData: ITrack) {
    addTrackToTheDb(trackData);
  }
  getAllArtists() {
    return getAllArtistsFromDb();
  }
  getArtistById(id: UUID) {
    return getArtistByIdFromDb(id);
  }

  getAllAlbums() {
    return getAllAlbumsFromDb();
  }
  getAlbumById(id: UUID) {
    return getAlbumByIdFromDb(id);
  }

  getAllFavorites() {
    return getAllFavoritesFromDb();
  }
  getFavoriteByArray(id: UUID) {
    return getFavoriteByArrayFromDb(['asdasd']);
  }
}
