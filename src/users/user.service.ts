import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      username: registerUserDto.username,
    });
    const userByUsername = await this.userRepository.findOneBy({
      email: registerUserDto.email,
    });
    if (userByUsername) {
      throw new HttpException(
        'This username already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (userByEmail) {
      throw new HttpException(
        'This email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, registerUserDto);
    return await this.userRepository.save(newUser);
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }
}
