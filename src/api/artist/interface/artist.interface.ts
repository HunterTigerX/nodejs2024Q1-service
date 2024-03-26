import { UUID } from 'crypto';

export interface IArtist {
  id: UUID;
  name: string;
  grammy: boolean;
}
