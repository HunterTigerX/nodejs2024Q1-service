import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'artists' })
export class Artists {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
