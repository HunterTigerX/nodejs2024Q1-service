import { ApiPropertyOptional } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Albums } from 'src/api/album/entities/album.entity';
import { Artists } from 'src/api/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'tracks' })
export class Tracks {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Artists, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: UUID | null;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Albums, { onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: UUID | null;

  @Column()
  duration: number;
}
