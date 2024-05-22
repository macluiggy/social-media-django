import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSeeders1713999461685 implements MigrationInterface {
  name = 'CreateTableSeeders1713999461685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // create table seeders, name should be unique
    await queryRunner.query(
      `CREATE TABLE "seeders" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL unique,
            "executed" boolean NOT NULL DEFAULT false,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_0b1a8f4a3f0b0d0f0c916a2b7e2" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_0b1a8f4a3f0b0d0f0c916a2b7e2" UNIQUE ("name")
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop table seeders
    await queryRunner.query(`DROP TABLE "seeders"`);
  }
}
