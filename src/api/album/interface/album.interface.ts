import { UUID } from 'crypto';

export interface IAlbum {
  id: UUID;
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist
}
