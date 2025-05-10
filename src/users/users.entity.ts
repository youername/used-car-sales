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

  // roles 컬럼 추가 (예: 기본 역할 'user' 할당)
  @Column('simple-array', { default: 'user' })
  roles: string[];
}
