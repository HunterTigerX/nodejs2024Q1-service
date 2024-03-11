import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
