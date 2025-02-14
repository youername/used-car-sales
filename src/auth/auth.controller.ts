import {
  Body,
  Controller,
  Post,
  Session,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { SignInUserDto } from 'src/users/dtos/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUsersDto, @Session() session) {
    const user = await this.authService.signUp(
      body.email,
      body.password,
      body.roles,
    );
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() body: SignInUserDto) {
    const user = await this.authService.signIn(body.email, body.password);
    return user;
  }
}
