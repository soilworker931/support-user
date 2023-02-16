import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
}
