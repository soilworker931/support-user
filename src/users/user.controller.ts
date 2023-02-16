import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';
import { IUserResponse } from './types/userResponse.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<IUserResponse> {
    console.log(registerUserDto);
    const user = await this.userService.registerUser(registerUserDto);
    delete user.password;
    delete user.createdAt;
    return this.userService.buildUserResponse(user);
  }
}
