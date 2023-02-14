import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SeedRoles1676409092218 } from './seeds/1676409092218-AddRoles';

const ormSeedConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [],
  synchronize: false,
  migrations: [SeedRoles1676409092218],
};

export default ormSeedConfig;
