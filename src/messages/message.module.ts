import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UserEntity } from 'src/users/user.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity, TicketEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
