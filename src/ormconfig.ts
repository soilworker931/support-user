import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RoleEntity } from './roles/role.entity';
import { AddRoles1676409092218 } from './migrations/1676409092218-AddRoles';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [RoleEntity],
  synchronize: false,
  migrations: [AddRoles1676409092218],
};

export default ormConfig;
