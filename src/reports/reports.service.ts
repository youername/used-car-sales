import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-reports.dto';
import { Users } from 'src/users/users.entity';
import { ApprovalReportDto } from './dtos/approval-reports.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Reports) private repo: Repository<Reports>) {}

  createReport(reportDto: CreateReportDto, user: Users) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async approve(id: any, approve: 'approved' | 'pending' | 'rejected') {
    let reportId: number;
    if (typeof id === 'object' && id !== null && 'id' in id) {
      reportId = parseInt(String(id.id), 10);
    } else {
      reportId = parseInt(String(id), 10);
    }
    const report = await this.repo.findOne({ where: { id: reportId } });
    if (!report) throw new BadRequestException('report is not found');

    report.approved = approve;
    return this.repo.save(report);
  }
}
