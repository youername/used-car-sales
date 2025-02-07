import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const CurrentUserDecorator = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
