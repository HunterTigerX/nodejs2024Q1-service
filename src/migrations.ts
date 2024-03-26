import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

console.log('in migrations22');
export class CreateDatabase1629304292361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'login', type: 'varchar', length: '255', isNullable: false },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'version', type: 'int', isNullable: false },
          { name: 'createdAt', type: 'bigint', isNullable: false },
          { name: 'updatedAt', type: 'bigint', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'artists',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'grammy', type: 'boolean', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'albums',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'artistId', type: 'uuid', isNullable: true },
          { name: 'year', type: 'int', isNullable: false },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['artistId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'artists',
            onDelete: 'SET NULL',
          }),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'tracks',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'artistId', type: 'uuid', isNullable: true },
          { name: 'albumId', type: 'uuid', isNullable: true },
          { name: 'duration', type: 'int', isNullable: false },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['albumId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'albums',
            onDelete: 'SET NULL',
          }),
          new TableForeignKey({
            columnNames: ['artistId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'artists',
            onDelete: 'SET NULL',
          }),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'favartists',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'grammy', type: 'boolean', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'favalbums',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'artistId', type: 'uuid', isNullable: true },
          { name: 'year', type: 'int', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'favtracks',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'artistId', type: 'uuid', isNullable: true },
          { name: 'albumId', type: 'uuid', isNullable: true },
          { name: 'duration', type: 'int', isNullable: false },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tracks');
    await queryRunner.dropTable('albums');
    await queryRunner.dropTable('favtracks');
    await queryRunner.dropTable('favalbums');
    await queryRunner.dropTable('favartists');
    await queryRunner.dropTable('artists');
    await queryRunner.dropTable('users');
  }
}
