import { IsEmail, IsString } from 'class-validator';
import { Reports } from 'src/reports/reports.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reports, (reports) => reports.user)
  reports: Reports[];
}
