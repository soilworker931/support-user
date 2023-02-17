import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTicketTable1676663295481 implements MigrationInterface {
  name = 'CreateTicketTable1676663295481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "reporterId" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_b1930f86a5e9b5b5be3689fc820" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_b1930f86a5e9b5b5be3689fc820"`,
    );
    await queryRunner.query(`DROP TABLE "tickets"`);
  }
}
