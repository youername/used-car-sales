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
import { CreateUsersDto } from './dtos/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';

@serialize(UsersDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
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
