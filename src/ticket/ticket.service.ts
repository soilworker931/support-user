import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UserEntity } from 'src/users/user.entity';
import { ITicketResponse } from './types/ticketResponse.interface';
import { ITicketsResponse } from './types/ticketsResponse.interface';
import { TicketStatus } from './types/ticketStatus.enum';
import { UpdateTicketStatusDto } from './dto/updateTicketStatus.dto';

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

  async updateTicketStatus(
    updateTicketStatusDto: UpdateTicketStatusDto,
  ): Promise<TicketEntity> {
    if (!Object.values(TicketStatus).includes(updateTicketStatusDto.status)) {
      throw new HttpException(
        'Incorret ticket status is provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const ticket = await this.ticketRepository.findOneBy({
      id: updateTicketStatusDto.id,
    });
    if (!ticket) {
      throw new HttpException(
        'Ticket does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (ticket.status === updateTicketStatusDto.status) {
      return ticket;
    }
    ticket.status = updateTicketStatusDto.status;
    return await this.ticketRepository.save(ticket);
  }

  buildTicketResponse(ticketEntity: TicketEntity): ITicketResponse {
    return {
      ticket: {
        ...ticketEntity,
      },
    };
  }
}
