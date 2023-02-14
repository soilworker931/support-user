import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1676409092218 implements MigrationInterface {
  name = 'SeedRoles1676409092218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles VALUES (1, 'Admin'), (2, 'Client')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
