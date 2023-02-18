import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateTicketDto } from './dto/createTicket.dto';
import { User } from 'src/users/decorators/user.decorator';
import { ITicketResponse } from './types/ticketResponse.interface';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ITicketsResponse } from './types/ticketsResponse.interface';
import { UpdateTicketStatusDto } from './dto/updateTicketStatus.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTicket(
    @User() currentUser: UserEntity,
    @Body('ticket') createTicketDto: CreateTicketDto,
  ): Promise<ITicketResponse> {
    const ticket = await this.ticketService.createTicket(
      currentUser,
      createTicketDto,
    );

    return this.ticketService.buildTicketResponse(ticket);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTickets(
    @User('id') currentUserId: number,
  ): Promise<ITicketsResponse> {
    return await this.ticketService.getTickets(currentUserId);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async updateTicketStatus(
    @Body('ticket') updateTicketStatusDto: UpdateTicketStatusDto,
  ): Promise<ITicketResponse> {
    const ticket = await this.ticketService.updateTicketStatus(
      updateTicketStatusDto,
    );
    return this.ticketService.buildTicketResponse(ticket);
  }
}
