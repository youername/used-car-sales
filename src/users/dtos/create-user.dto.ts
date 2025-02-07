import { IsEmail, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
