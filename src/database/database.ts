import { UUID } from 'crypto';
import {
  notFound,
  somethingExists,
  wrongPassword,
  returnData,
  alreadyFav,
  noIdInDbWhenFav,
  successDeletion,
  addedToFav,
} from '../errorsAndMessages/errors';
import { IAlbum } from 'src/api/album/interface/album.interface';
import { IArtist } from 'src/api/artist/interface/artist.interface';
import { IFavorites } from 'src/api/favorites/interface/favorites.interface';
import { ITrack } from 'src/api/track/interface/track.interface';
import {
  IUser,
  IUpdatePasswordDto,
} from 'src/api/user/interface/user.interface';

export class temporaryDB {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private artists: IArtist[] = [];
  private albums: IAlbum[] = [];
  private favorites: IFavorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  // check all of something from db is below 5/5
  getAllUsers() {
    return this.users;
  }
  // get something from db by id or else is below 5/5
  getUserById(id: UUID): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  checkUserByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    return user;
  }

  // add everything do db is below 5/5
  addUser(newUser: IUser) {
    this.users.push(newUser);
    this.returnUserDataWithousPass(newUser, 'create');
  }

  // return data to user if needed is below
  returnUserDataWithousPass(data: any, operation: 'create' | 'update') {
    const copy = JSON.parse(JSON.stringify(data));
    delete copy.password;
    return returnData(copy, operation);
  }

  // update something is below 4/4
  updateUser(id: UUID, data: IUpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const userOldPassword = user.password;
      if (data.oldPassword === userOldPassword) {
        const timeStamp = Date.now();
        user.password = data.newPassword;
        user.version += 1;
        user.updatedAt = timeStamp;
        this.returnUserDataWithousPass(user, 'update');
      } else {
        wrongPassword();
      }
    } else {
      notFound();
    }
  }

  // remove smth from db is below 5/5
  removeUserFromDb(id: UUID) {
    const user = this.getUserById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      successDeletion();
    } else {
      notFound();
    }
  }

  clearAfterDeletion(id: UUID, type: 'artist' | 'track' | 'album') {
    // When album was deleted we remove album from track data
    // When artist was deleted we remove artist from track and album
    // When track data was deleted we do nothing
    if (type === 'album') {
      this.tracks.forEach((track) => {
        if (track.albumid === id) {
          track.albumid = null;
        }
      });
    }
    if (type === 'artist') {
      this.albums.forEach((album) => {
        if (album.artistid === id) {
          album.artistid = null;
        }
      });
      this.tracks.forEach((track) => {
        if (track.artistid === id) {
          track.artistid = null;
        }
      });
    }

    if (type !== 'artist') {
      this.favorites.artists = this.favorites.artists.filter((artist) => {
        artist.id !== id;
      });
    }
    if (type !== 'album') {
      this.favorites.albums = this.favorites.albums.filter((album) => {
        album.id !== id;
      });
    }
    if (type !== 'track') {
      this.favorites.tracks = this.favorites.tracks.filter((track) => {
        track.id !== id;
      });
    }
  }
}
