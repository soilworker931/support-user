import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SeedAdmin1676671638873 } from './seeds/1676671638873-Migration';

const ormSeedConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [],
  synchronize: false,
  migrations: [SeedAdmin1676671638873],
};

export default ormSeedConfig;
