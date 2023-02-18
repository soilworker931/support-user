import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { MessageService } from './message.service';
import { User } from 'src/users/decorators/user.decorator';
import { SendMessageDto } from './dto/sendMessage.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async sendMessage(
    @User('id') currentUserId: number,
    @Body('message') sendMessageDto: SendMessageDto,
  ) {
    await this.messageService.sendMessage(currentUserId, sendMessageDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getMessages(
    @User('id') currentUserId: number,
    @Body('ticketId') ticketId: number,
  ) {
    return await this.messageService.getMessages(currentUserId, ticketId);
  }
}
