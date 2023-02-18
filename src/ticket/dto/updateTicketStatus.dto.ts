import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TicketStatus } from '../types/ticketStatus.enum';

export class UpdateTicketStatusDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
