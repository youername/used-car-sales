import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from 'src/users/users.entity';
import { ReportDto } from './dtos/report.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ApprovalReportDto } from './dtos/approval-reports.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: Users) {
    return this.reportsService.createReport(body, user);
  }

  @Patch('/:id')
  approve(@Body() body: ApprovalReportDto, @Param() id: string) {
    return this.reportsService.approve(id, body.approve);
  }
}
