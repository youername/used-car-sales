import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'yooyuudoghot1',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
