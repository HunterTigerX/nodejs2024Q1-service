import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favtracks' })
export class FavTracks {
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

@Entity({ name: 'favalbums' })
export class FavAlbums {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'text', nullable: true })
  artistId: string | null;
}

@Entity({ name: 'favartists' })
export class FavArtists {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
