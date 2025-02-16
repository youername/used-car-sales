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
import { ResetPasswordDto } from './dtos/reset-password.dto';

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

  @Post('reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    // resetPassword는 별도 응답값 없이 업데이트 후 성공 메시지를 반환하도록 할 수 있습니다.
    await this.authService.resetPassword(body.email, body.password);
    return { message: 'Password reset successfully' };
  }
}
