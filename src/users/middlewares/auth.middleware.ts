import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user.service';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IJwtPayload } from 'src/types/jwtPayload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(
    req: ExpressRequestInterface,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const { id } = verify(token, process.env.JWT_SECRET) as IJwtPayload;
      const user = await this.userService.findById(id);
      req.user = user;
    } catch {
      req.user = null;
    }
    next();
  }
}
