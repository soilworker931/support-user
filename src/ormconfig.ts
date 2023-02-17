import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from './users/user.entity';
import { TicketEntity } from './ticket/ticket.entity';
import { Migration1676671638873 } from './migrations/1676671638873-Migration';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [UserEntity, TicketEntity],
  synchronize: false,
  migrations: [Migration1676671638873],
};

export default ormConfig;
