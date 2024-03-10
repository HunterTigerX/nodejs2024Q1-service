import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'albums' })
export class Albums {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'text', nullable: true })
  artistId: string | null;
}

/*
export interface IAlbum {
  id: UUID;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
*/
