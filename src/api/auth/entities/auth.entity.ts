import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  id: UUID | null;

  @Column({ nullable: true })
  accessToken: string | null;

  @Column({ nullable: true })
  refreshToken: string | null;
}
