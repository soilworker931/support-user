import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
