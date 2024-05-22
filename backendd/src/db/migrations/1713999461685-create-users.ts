import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DEFAULT_LANG } from '../../lang';

export class CreateTableUser1684206622652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'is_password_reset',
            type: 'boolean',
            default: false,
          },
          {
            name: 'signature',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
            default: 'user',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'preferred_language',
            type: 'varchar',
            length: '10',
            default: `'${DEFAULT_LANG}'`,
            enum: ['en', 'es'],
            enumName: 'preferred_language_enum',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
        indices: [],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }
}
