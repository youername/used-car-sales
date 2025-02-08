import { IsBoolean, IsString } from 'class-validator';

export class ApprovalReportDto {
  @IsString()
  approve: 'approved' | 'pending' | 'rejected';
}
