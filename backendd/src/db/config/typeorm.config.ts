import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from '../entities';
import * as dotenv from 'dotenv';
dotenv.config();
import { SeederOptions } from 'typeorm-extension';
import subscribers from '../subscribers';
import envVariables from '../../common/envVariables';
import userFactory from '../factories/user.factory';
import DB_MIGRATIONS from '../migrations';
import { DataSource } from 'typeorm';
import seeders from '../seeders';

const { db } = envVariables;

const typeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  url: db.databaseUrl,
  migrations: DB_MIGRATIONS,
  entities,
  synchronize: false,
  seeds: seeders,
  factories: [userFactory],
  subscribers: subscribers,
};

export { typeOrmConfig };

export default new DataSource(typeOrmConfig as any);
