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

@serialize(UsersDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findSome(@Query('email') email: string) {
    return this.usersService.findSome(email);
  }

  @Post()
  async createUser(@Body() body: CreateUsersDto, @Session() session) {
    const user = await this.usersService.createUser(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() attr: Partial<Users>) {
    return this.usersService.updateUser(id, attr);
  }
}
