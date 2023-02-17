import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTicketTable1676665040604 implements MigrationInterface {
  name = 'UpdateTicketTable1676665040604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "createdAt" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD "description" integer NOT NULL`,
    );
  }
}
