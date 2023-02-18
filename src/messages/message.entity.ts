import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.id)
  ticket: TicketEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  sender: UserEntity;
}
