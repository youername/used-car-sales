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
import { JwtGuard } from 'src/jwt/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(JwtGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: Users) {
    return this.reportsService.createReport(body, user);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles('user')
  approve(@Body() body: ApprovalReportDto, @Param() id: string) {
    return this.reportsService.approve(id, body.approve);
  }
}
