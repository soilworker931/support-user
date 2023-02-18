import { IsNotEmpty, IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  ticketId: number;

  @IsNotEmpty()
  message: string;
}
