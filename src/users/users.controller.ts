import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UsersDto } from './dtos/users.dto';
import { CreateUsersDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@serialize(UsersDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findSome(@Query('email') email: string) {
    return this.usersService.findSome(email);
  }

  @Post('signup')
  async signUp(@Body() body: CreateUsersDto, @Session() session) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() body: CreateUsersDto, @Session() session) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() attr: Partial<Users>) {
    return this.usersService.updateUser(id, attr);
  }
}
