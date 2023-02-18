import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketStatus } from './types/ticketStatus.enum';
import { MessageEntity } from 'src/messages/message.entity';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.CREATED })
  status: TicketStatus;

  @ManyToOne(() => UserEntity, (user) => user.tickets, { eager: true })
  reporter: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.id)
  messages: MessageEntity;
}
