import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;
}
