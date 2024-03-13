import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1710335205558 implements MigrationInterface {
  name = 'Bootstrap1710335205558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" text, "albumId" text, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favtracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" text, "albumId" text, "duration" integer NOT NULL, CONSTRAINT "PK_badda1a23d3117b562c85754e68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favalbums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" text, CONSTRAINT "PK_2b5e85eb613c022ec760c018a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favartists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_f1d1c09d053dc9a06dc786664b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" text, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "favartists"`);
    await queryRunner.query(`DROP TABLE "favalbums"`);
    await queryRunner.query(`DROP TABLE "favtracks"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
