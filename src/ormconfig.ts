import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from './users/user.entity';
import { TicketEntity } from './ticket/ticket.entity';
import { Migration1676715872759 } from './migrations/1676715872759-Migration';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [UserEntity, TicketEntity],
  synchronize: false,
  migrations: [Migration1676715872759],
};

export default ormConfig;
