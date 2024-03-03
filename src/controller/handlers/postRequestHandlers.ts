import { ICreateUserDto, ITrack } from 'src/interfaces/interface';
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
