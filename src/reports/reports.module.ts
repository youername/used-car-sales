import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './reports.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  providers: [ReportsService],
})
export class ReportsModule {}
