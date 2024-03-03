import { UUID, randomUUID } from 'crypto';
import {
  notFound,
  somethingExists,
  wrongPassword,
  returnData,
} from '../errorsAndMessages/errors';
import {
  INewUser,
  IUser,
  IArtist,
  ITrack,
  IFavorites,
  IUpdatePasswordDto,
  IAlbum,
} from 'src/interfaces/interface';

export class temporaryDB {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private artists: IArtist[] = [];
  private albums: IAlbum[] = [];
  private favorites: IFavorites[] = [];

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
  getFavoriteByArray(artists: string[]) {
    // const favorite = this.favorites.find((favorite) => favorite.id === id);
    // return favorite;
  }

  // check if something is in the db is below 4/5
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
  addUser(data: INewUser) {
    if (!this.checkUserByLogin(data.login)) {
      const newUUID = randomUUID();
      const timeStamp = Date.now();
      const newUser: IUser = {
        ...data,
        version: 1,
        id: newUUID,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      };
      this.users.push(newUser);
      this.returnUserDataWithousPass(newUser, 'create');
    } else {
      // user with this login exists in our db
      somethingExists('user');
    }
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
  addFavs(newFavs: IFavorites) {
    // if (!this.checkTrackById(data.id)) {
    //     this.tracks.push(data);
    //     returnData(data, 'create');
    //   } else {
    //     // track with this id exists in our db
    //     somethingExists('track');
    //   }
  }

  // return data to user if needed is below
  returnUserDataWithousPass(data: any, operation: 'create' | 'update') {
    const copy = JSON.parse(JSON.stringify(data));
    delete copy.password;
    console.log('Check later!!!');
    // !!! Check in chat the format of the new user, login or full data withour pass. No pass is in video req.
    return returnData(copy, operation);
  }

  // update something is below 5/5
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
    let track = this.tracks.find((track) => track.id === id);
    if (track) {
      track = data;
    } else {
      notFound();
    }
  }
  updateArtist(id: UUID, data: IArtist) {
    let artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      artist = data;
    } else {
      notFound();
    }
  }
  updateAlbum(id: UUID, data: IAlbum) {
    let album = this.albums.find((album) => album.id === id);
    if (album) {
      album = data;
    } else {
      notFound();
    }
  }
  updateFavs(id: UUID, data: IFavorites) {
    console.log('update favs');
    // let track = this.tracks.find((track) => track.id === id);
    // if (track) {
    //   track = data;
    // } else {
    //   notFound();
    // }
  }

  // remove smth from db is below 5/5
  removeUserFromDb(id: UUID) {
    const user = this.getUserById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    } else {
      notFound();
    }
  }
  removeTrackFromDb(id: UUID) {
    const track = this.getTrackById(id);
    if (track) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
    } else {
      notFound();
    }
  }
  removeAlbumFromDb(id: UUID) {
    console.log('he');
    //     const track = this.getTrackById(id);
    //     if (track) {
    //       this.tracks = this.tracks.filter((track) => track.id !== id);
    //     } else {
    //       notFound();
    //     }
  }
  removeArtistFromDb(id: UUID) {
    console.log('he');
    //     const track = this.getTrackById(id);
    //     if (track) {
    //       this.tracks = this.tracks.filter((track) => track.id !== id);
    //     } else {
    //       notFound();
    //     }
  }
  removeFavsFromDb(id: UUID) {
    console.log('he');
    //     const track = this.getTrackById(id);
    //     if (track) {
    //       this.tracks = this.tracks.filter((track) => track.id !== id);
    //     } else {
    //       notFound();
    //     }
  }
}
