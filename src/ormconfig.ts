import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RoleEntity } from './roles/role.entity';
import { UserEntity } from './users/user.entity';
import { CreateUserAndRole1676579516754 } from './migrations/1676579516754-CreateUserAndRole';
import { TicketEntity } from './ticket/ticket.entity';
import { CreateTicketTable1676663295481 } from './migrations/1676663295481-CreateTicketTable';
import { UpdateTicketTable1676665040604 } from './migrations/1676665040604-UpdateTicketTable';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'support_user',
  password: 'root',
  database: 'support_users_db',
  entities: [RoleEntity, UserEntity, TicketEntity],
  synchronize: false,
  migrations: [
    CreateUserAndRole1676579516754,
    CreateTicketTable1676663295481,
    UpdateTicketTable1676665040604,
  ],
};

export default ormConfig;
