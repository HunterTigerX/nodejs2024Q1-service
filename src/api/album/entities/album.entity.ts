import { UUID } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Artists } from 'src/api/artist/entities/artist.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'albums' })
export class Albums {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  year: number;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Artists, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: UUID | null;
}
