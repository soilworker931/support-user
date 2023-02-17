import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1676671638873 implements MigrationInterface {
  name = 'SeedAdmin1676671638873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // password 123
    await queryRunner.query(
      `INSERT INTO users VALUES (1, 'admin', 'admin@mail.ru', '$2b$08$Uzz1ooIrQJIJ4Ck4CrjrvexSTEDl41o9V5ATg4SOQuKeBwuWL/72G', '+48571525950', 'Admin', '2023-02-17 23:17:16.132')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
