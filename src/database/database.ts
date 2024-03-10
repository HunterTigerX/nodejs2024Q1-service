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
  getAllTracks() {
    return this.tracks;
  }
  getAllAlbums() {
    return this.albums;
  }
  getAllArtists() {
    return this.artists;
  }
  getAllFavorites() {
    return this.favorites;
  }

  // get something from db by id or else is below 5/5
  getUserById(id: UUID): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  getTrackById(id: UUID): ITrack | undefined {
    const user = this.tracks.find((track) => track.id === id);
    return user;
  }
  getArtistById(id: UUID): IArtist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  getAlbumById(id: UUID): IAlbum | undefined {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  // check if something is in the db is below 4/4
  checkUserByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    return user;
  }
  checkTrackById(id: UUID) {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }
  checkAlbumById(id: UUID) {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }
  checkArtistById(id: UUID) {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  // add everything do db is below 5/5
  addUser(newUser: IUser) {
    this.users.push(newUser);
    this.returnUserDataWithousPass(newUser, 'create');
  }
  addTrack(data: ITrack) {
    if (!this.checkTrackById(data.id)) {
      this.tracks.push(data);
      returnData(data, 'create');
    } else {
      // track with this id exists in our db
      somethingExists('track');
    }
  }
  addArtist(newArtist: IArtist) {
    if (!this.checkTrackById(newArtist.id)) {
      this.artists.push(newArtist);
      returnData(newArtist, 'create');
    } else {
      // track with this id exists in our db
      somethingExists('track');
    }
  }
  addAlbum(newAlbum: IAlbum) {
    if (!this.checkAlbumById(newAlbum.id)) {
      this.albums.push(newAlbum);
      returnData(newAlbum, 'create');
    } else {
      // track with this id exists in our db
      somethingExists('album');
    }
  }
  addRemoveFavs(
    id: UUID,
    type: 'track' | 'artist' | 'album',
    operation: 'add' | 'remove',
  ) {
    if (type === 'track') {
      const doTrackExistInDb = this.checkTrackById(id);
      if (!doTrackExistInDb) {
        noIdInDbWhenFav(type);
      }
      const doTrackExistInFavs =
        this.favorites.tracks.length !== 0
          ? this.favorites.tracks.find((track) => track.id === id)
          : undefined;
      if (operation === 'add' && doTrackExistInFavs) {
        alreadyFav('track');
      } else {
        if (operation === 'remove') {
          this.favorites.tracks = this.favorites.tracks.filter(
            (track) => track.id !== id,
          );
          successDeletion();
        } else if (operation === 'add') {
          this.favorites.tracks.push(doTrackExistInDb);
          return addedToFav(this.favorites.tracks);
        }
      }
    }
    if (type === 'artist') {
      const doArtistExistInDb = this.checkArtistById(id);
      if (!doArtistExistInDb) {
        noIdInDbWhenFav(type);
      }
      const doArtistExistInFavs =
        this.favorites.artists.length !== 0
          ? this.favorites.artists.find((artist) => artist.id === id)
          : undefined;

      if (operation === 'add' && doArtistExistInFavs) {
        alreadyFav('artist');
      } else {
        if (operation === 'remove') {
          this.favorites.artists = this.favorites.artists.filter(
            (artist) => artist.id !== id,
          );
          successDeletion();
        } else if (operation === 'add') {
          this.favorites.artists.push(doArtistExistInDb);
          return addedToFav(this.favorites.artists);
        }
      }
    }
    if (type === 'album') {
      const doAlbumExistInDb = this.checkAlbumById(id);
      if (!doAlbumExistInDb) {
        noIdInDbWhenFav(type);
      }
      const doAlbumExistInFavs =
        this.favorites.albums.length === 0
          ? this.favorites.albums.find((album) => album.id === id)
          : undefined;
      if (operation === 'add' && doAlbumExistInFavs) {
        alreadyFav('album');
      } else {
        if (operation === 'remove') {
          this.favorites.albums = this.favorites.albums.filter(
            (album) => album.id !== id,
          );
          successDeletion();
        } else if (operation === 'add') {
          this.favorites.albums.push(doAlbumExistInDb);
          return addedToFav(this.favorites.albums);
        }
      }
    }
  }

  // return data to user if needed is below
  returnUserDataWithousPass(data: any, operation: 'create' | 'update') {
    const copy = JSON.parse(JSON.stringify(data));
    delete copy.password;
    // !!! Check in chat the format of the new user, login or full data withour pass. No pass is in video req.
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
  updateTrack(id: UUID, data: ITrack) {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      track.id = data.id ? data.id : id;
      track.albumId = data.albumId;
      track.artistId = data.artistId;
      track.duration = data.duration;
      track.name = data.name;
      returnData(track, 'update');
    } else {
      notFound();
    }
  }
  updateArtist(id: UUID, data: IArtist) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      artist.id = data.id ? data.id : id;
      artist.name = data.name;
      artist.grammy = data.grammy;
      returnData(artist, 'update');
    } else {
      notFound();
    }
  }
  updateAlbum(id: UUID, data: IAlbum) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      album.id = data.id ? data.id : id;
      album.name = data.name;
      album.year = data.year;
      album.artistId = data.artistId;
      returnData(album, 'update');
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
  removeTrackFromDb(id: UUID) {
    const track = this.getTrackById(id);
    if (track) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      this.clearAfterDeletion(id, 'track');
      successDeletion();
    } else {
      notFound();
    }
  }
  removeAlbumFromDb(id: UUID) {
    const album = this.getAlbumById(id);
    if (album) {
      this.albums = this.albums.filter((album) => album.id !== id);
      this.clearAfterDeletion(id, 'album');
      successDeletion();
    } else {
      notFound();
    }
  }
  removeArtistFromDb(id: UUID) {
    const artist = this.getArtistById(id);
    if (artist) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      this.clearAfterDeletion(id, 'artist');
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
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }
    if (type === 'artist') {
      this.albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
      this.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
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
      this.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
      this.favorites.tracks = this.favorites.tracks.filter((track) => {
        track.id !== id;
      });
    }
  }
}
