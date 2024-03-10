import { UUID } from 'crypto';

export interface IAlbum {
  id: UUID;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
