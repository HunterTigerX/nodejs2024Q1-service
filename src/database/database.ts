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

  getAllUsers() {
    return this.users;
  }
  getUserById(id: UUID): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  checkUserByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    return user;
  }
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
  returnUserDataWithousPass(data: any, operation: 'create' | 'update') {
    const copy = JSON.parse(JSON.stringify(data));
    delete copy.password;
    console.log('Check later!!!');
    // !!! Check in chat the format of the new user, login or full data withour pass. No pass is in video req.
    return returnData(copy, operation);
  }
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
  removeUserFromDb(id: UUID) {
    const user = this.getUserById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    } else {
      notFound();
    }
  }
  getAllTracks() {
    return this.tracks;
  }
  getTrackById(id: UUID): ITrack | undefined {
    const user = this.tracks.find((track) => track.id === id);
    return user;
  }
  checkTrackById(id: UUID) {
    const track = this.tracks.find((track) => track.id === id);
    return track;
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
  updateTrack(id: UUID, data: ITrack) {
    let track = this.tracks.find((track) => track.id === id);
    if (track) {
      track = data;
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
  getAllArtists() {
    return this.artists;
  }
  getArtistById(id: UUID): IArtist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  getAllAlbums() {
    return this.albums;
  }
  getAlbumById(id: UUID): IAlbum | undefined {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  getAllFavorites() {
    return this.favorites;
  }
  getFavoriteByArray(artists: string[]) {
    // const favorite = this.favorites.find((favorite) => favorite.id === id);
    // return favorite;
  }
}
