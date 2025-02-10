import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateUsersDto, @Session() session) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() body: CreateUsersDto) {
    const user = await this.authService.signIn(body.email, body.password);
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Body() body: CreateUsersDto) {
    const user = await this.authService.resetPassword(
      body.email,
      body.password,
    );
  }

  @Patch()
  async resetPasswordSend(@Body() body: ResetPasswordDto) {
    const [users] = await this.usersService.findSome(body.email);
    return this.authService.resetPasswordSend(users.id, body.password);
  }
}
