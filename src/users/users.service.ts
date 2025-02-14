import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findSome(email: string) {
    return this.repo.find({ where: { email } });
  }

  createUser(email: string, password: string, roles: string[]) {
    const user = this.repo.create({ email, password });
    user.roles = roles;
    return this.repo.save(user);
  }

  updateUser(id: number, attr: Partial<Users>) {
    const user = this.findOne(id);
    return this.repo.save({ ...user, ...attr });
  }
}
