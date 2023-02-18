import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { UserRole } from '../types/userRole.enum';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (request.user.role === UserRole.ADMIN) {
      return true;
    }
    throw new HttpException('User is not an admin', HttpStatus.UNAUTHORIZED);
  }
}
