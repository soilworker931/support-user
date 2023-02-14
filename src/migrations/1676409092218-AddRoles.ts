import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1676409092218 implements MigrationInterface {
  name = 'AddRoles1676409092218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
