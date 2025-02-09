import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UsersDto } from './dtos/users.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@serialize(UsersDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: Users) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findSome(@Query('email') email: string) {
    return this.usersService.findSome(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() attr: Partial<Users>) {
    return this.usersService.updateUser(id, attr);
  }
}
