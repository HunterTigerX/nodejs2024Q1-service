import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tracks' })
export class Tracks {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  artistId: string | null;

  @Column({ type: 'text', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}

/*
Track DTO {
  id: UUID;
  year: any;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
*/
