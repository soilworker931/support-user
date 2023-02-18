import { MessageEntity } from '../message.entity';

export interface IMessagesResponse {
  messages: MessageEntity[];
  messagesCount: number;
}
