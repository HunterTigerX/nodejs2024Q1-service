import { IAlbum } from 'src/api/album/interface/album.interface';
import { IArtist } from 'src/api/artist/interface/artist.interface';
import { ITrack } from 'src/api/track/interface/track.interface';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
