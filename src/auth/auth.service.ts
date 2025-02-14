import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, roles: string[]) {
    const users = await this.usersService.findSome(email);
    if (users.length) throw new BadRequestException('email is alreay used');

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    const user = this.usersService.createUser(email, result, roles);
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findSome(email);
    if (!user) throw new BadRequestException('user or password is invailed');

    const [salt, storeHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('user or password is invailed');
    }

    const payload = { sub: user.id, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
