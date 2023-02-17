import { hash } from 'bcrypt';
import { TicketEntity } from 'src/ticket/ticket.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './types/userRole.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRole, default: 'Client' })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => TicketEntity, (ticket) => ticket.reporter)
  tickets: TicketEntity[];

  @BeforeInsert()
  async registerUser(): Promise<void> {
    this.createdAt = new Date();
    this.password = await hash(
      this.password,
      Number(process.env.PASSWORD_SALT),
    );
  }

  @BeforeUpdate()
  async updateUser(): Promise<void> {
    if (this.password) {
      this.password = await hash(
        this.password,
        Number(process.env.PASSWORD_SALT),
      );
    }
  }
}
