import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UserEntity } from 'src/users/user.entity';
import { ITicketResponse } from './types/ticketResponse.interface';
import { ITicketsResponse } from './types/ticketsResponse.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    private dataSource: DataSource,
  ) {}

  async createTicket(
    currentUser: UserEntity,
    createTicketDto: CreateTicketDto,
  ): Promise<TicketEntity> {
    const ticket = new TicketEntity();
    Object.assign(ticket, createTicketDto);
    ticket.reporter = currentUser;

    return await this.ticketRepository.save(ticket);
  }

  async getTickets(currentUserId: number): Promise<ITicketsResponse> {
    const queryBuilder = this.dataSource
      .getRepository(TicketEntity)
      .createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.reporter', 'reporter');

    queryBuilder.andWhere('tickets.reporterId = :id', { id: currentUserId });

    const ticketsCount = await queryBuilder.getCount();
    const tickets = await queryBuilder.getMany();

    return { tickets: tickets, ticketsCount: ticketsCount };
  }

  buildTicketResponse(ticketEntity: TicketEntity): ITicketResponse {
    return {
      ticket: {
        ...ticketEntity,
      },
    };
  }
}
