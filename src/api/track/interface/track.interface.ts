import { UUID } from 'crypto';

export interface ITrack {
  id: UUID;
  name: string;
  artistid: string | null; // refers to Artist
  albumid: string | null; // refers to Album
  duration: number; // integer number
}
