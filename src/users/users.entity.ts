import { IsEmail, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
