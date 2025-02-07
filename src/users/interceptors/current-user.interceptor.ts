import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session.userId;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    return next.handle();
  }
}
