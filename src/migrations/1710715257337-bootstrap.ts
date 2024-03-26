import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1710715257337 implements MigrationInterface {
  name = 'Bootstrap1710715257337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_ed378d7c337efd4d5c8396a77a" UNIQUE ("artistId"), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "REL_62f595181306916265849fced4" UNIQUE ("artistId"), CONSTRAINT "REL_5c52e761792791f57de2fec342" UNIQUE ("albumId"), CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favtracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "REL_f2052e33878e78083e816cfd7b" UNIQUE ("artistId"), CONSTRAINT "REL_f168e88328e3b1345df08cd66c" UNIQUE ("albumId"), CONSTRAINT "PK_badda1a23d3117b562c85754e68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favalbums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_a95311f71408608435e4e7264f" UNIQUE ("artistId"), CONSTRAINT "PK_2b5e85eb613c022ec760c018a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favartists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_f1d1c09d053dc9a06dc786664b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favtracks" ADD CONSTRAINT "FK_f2052e33878e78083e816cfd7be" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favtracks" ADD CONSTRAINT "FK_f168e88328e3b1345df08cd66c6" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favalbums" ADD CONSTRAINT "FK_a95311f71408608435e4e7264fb" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favalbums" DROP CONSTRAINT "FK_a95311f71408608435e4e7264fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favtracks" DROP CONSTRAINT "FK_f168e88328e3b1345df08cd66c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favtracks" DROP CONSTRAINT "FK_f2052e33878e78083e816cfd7be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(`DROP TABLE "favartists"`);
    await queryRunner.query(`DROP TABLE "favalbums"`);
    await queryRunner.query(`DROP TABLE "favtracks"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
