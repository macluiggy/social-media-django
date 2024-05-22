import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileKeyToUsersTable1715898100002
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // add column profile_image_key to users table
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN profile_image_key TEXT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop column profile_image_key from users table
    await queryRunner.query(`ALTER TABLE users DROP COLUMN profile_image_key;`);
  }
}
