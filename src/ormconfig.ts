import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from './users/user.entity';
import { TicketEntity } from './ticket/ticket.entity';
import { MessageEntity } from './messages/message.entity';
import { Migration1676745837066 } from './migrations/1676745837066-Migration';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [UserEntity, TicketEntity, MessageEntity],
  synchronize: false,
  migrations: [Migration1676745837066],
};

export default ormConfig;
