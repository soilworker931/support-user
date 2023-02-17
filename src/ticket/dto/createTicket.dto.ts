import { IsNotEmpty, Length } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @Length(5, 50)
  title: string;

  @IsNotEmpty()
  @Length(5, 500)
  description: string;
}
