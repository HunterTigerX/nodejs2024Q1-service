import { UUID } from 'crypto';

export interface ITrack {
  id: UUID;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
