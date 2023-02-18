import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { SendMessageDto } from './dto/sendMessage.dto';
import { UserEntity } from 'src/users/user.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserRole } from 'src/users/types/userRole.enum';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
  ) {}

  async sendMessage(currentUserId: number, sendMessageDto: SendMessageDto) {
    const user = await this.userRepository.findOneBy({
      id: currentUserId,
    });
    const ticket = await this.ticketRepository.findOneBy({
      id: sendMessageDto.ticketId,
    });
    if (!ticket) {
      throw new HttpException(
        'The ticket does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const message = new MessageEntity();
    Object.assign(message, sendMessageDto);
    message.ticket = ticket;
    message.sender = user;

    if (currentUserId === ticket.reporter.id || user.role === UserRole.ADMIN) {
      return await this.messageRepository.save(message);
    }

    throw new HttpException(
      'You are not authorized to send the message',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
