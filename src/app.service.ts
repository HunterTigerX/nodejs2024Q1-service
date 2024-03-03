import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { db } from 'src/main';
import {
  ICreateUserDto,
  ITrack,
  IUpdatePasswordDto,
  IAlbum,
  IArtist,
  IUser,
} from './interfaces/interface';
@Injectable()
export class AppService {
  getAllUsers() {
    const users = db.getAllUsers();
    return users;
  }
  getAllTracks() {
    const tracks = db.getAllTracks();
    return tracks;
  }
  getAllArtists() {
    const tracks = db.getAllArtists();
    return tracks;
  }
  getAllAlbums() {
    const albums = db.getAllAlbums();
    return albums;
  }
  getAllFavorites() {
    const favorites = db.getAllFavorites();
    return favorites;
  }
  // get all - 5/5

  getUserById(id: UUID) {
    const user = db.getUserById(id);
    return user;
  }
  getTrackById(id: UUID) {
    const track = db.getTrackById(id);
    return track;
  }
  getAlbumById(id: UUID) {
    const album = db.getAlbumById(id);
    return album;
  }
  getArtistById(id: UUID) {
    const artist = db.getArtistById(id);
    return artist;
  }
  // get by - 4/4

  addUser(data: ICreateUserDto) {
    const newUUID = randomUUID();
    const timeStamp = Date.now();
    const newUser: IUser = {
      login: data.login,
      password: data.password,
      version: 1,
      id: newUUID,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    db.addUser(newUser);
  }
  addTrack(data: ITrack) {
    const newUUID = randomUUID();
    const newTrack = {
      id: newUUID,
      name: data.name,
      artistId: data.artistId,
      albumId: data.albumId,
      duration: data.duration,
    };
    db.addTrack(newTrack);
  }
  addArtist(data: IArtist) {
    const newUUID = randomUUID();
    const newArtist = {
      id: newUUID,
      name: data.name,
      grammy: data.grammy,
    };
    db.addArtist(newArtist);
  }
  addAlbum(data: IAlbum) {
    const newUUID = randomUUID();
    const newAlbum = {
      id: newUUID,
      name: data.name,
      year: data.year,
      artistId: data.artistId,
    };
    db.addAlbum(newAlbum);
  }
  addFav(id: UUID, type: 'track' | 'album' | 'artist') {
    db.addRemoveFavs(id, type, 'add');
  }
  // add - 5/5

  updateUser(id: UUID, data: IUpdatePasswordDto) {
    db.updateUser(id, data);
  }
  updateTrack(id: UUID, data: ITrack) {
    db.updateTrack(id, data);
  }
  updateArtist(id: UUID, data: IArtist) {
    db.updateArtist(id, data);
  }
  updateAlbum(id: UUID, data: IAlbum) {
    db.updateAlbum(id, data);
  }
  // update - 4/4

  deleteUser(id: UUID) {
    db.removeUserFromDb(id);
  }
  deleteTrack(id: UUID) {
    db.removeTrackFromDb(id);
  }
  deleteArtist(id: UUID) {
    db.removeArtistFromDb(id);
  }
  deleteAlbum(id: UUID) {
    db.removeAlbumFromDb(id);
  }
  deleteFromFav(id: UUID, type: 'track' | 'artist' | 'album') {
    db.addRemoveFavs(id, type, 'remove');
  }
  // delete - 5/5
}
