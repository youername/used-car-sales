import { Expose } from 'class-transformer';

export class UsersDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
