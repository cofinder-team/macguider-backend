import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common/pagination.dto';

export class DealRequestDto extends PaginationDto {
  @IsIn(['M', 'P'])
  @IsOptional()
  type?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  model?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  direction?: string;
}
