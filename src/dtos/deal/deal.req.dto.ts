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

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  option?: number;

  @IsIn(['중고나라', '번개장터'])
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  direction?: string;
}
