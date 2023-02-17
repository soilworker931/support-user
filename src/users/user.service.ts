import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

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
        `${registerUserDto.username} name is already taken`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (userByEmail) {
      throw new HttpException(
        `${registerUserDto.username} email is already taken`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, registerUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      email: loginUserDto.email,
    });
    if (!user) {
      throw new HttpException(
        `${loginUserDto.email} user does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        `Incorrect password`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }

  async updateUser(
    currentUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(currentUserId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    delete user.createdAt;
    delete user.password;
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
