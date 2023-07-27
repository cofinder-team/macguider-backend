import { IsNotEmpty, IsString } from 'class-validator';

export class DealReportRequestDto {
  @IsString()
  @IsNotEmpty()
  report: string;
}
