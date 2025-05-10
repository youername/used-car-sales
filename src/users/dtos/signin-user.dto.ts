import { IsArray, IsEmail, IsString } from 'class-validator';

import { PrimaryGeneratedColumn } from 'typeorm';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
