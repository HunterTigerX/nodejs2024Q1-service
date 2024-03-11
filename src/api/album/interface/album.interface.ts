import { UUID } from 'crypto';

export interface IAlbum {
  id: UUID;
  name: string;
  year: number;
  artistid: string | null; // refers to Artist
}
