import { TicketEntity } from '../ticket.entity';

export interface ITicketsResponse {
  tickets: TicketEntity[];
  ticketsCount: number;
}
