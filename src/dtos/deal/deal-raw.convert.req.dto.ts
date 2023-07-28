import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';

export class DealRawConvertRequestDto {
  @IsBoolean()
  @Type(() => Boolean)
  valid: boolean;

  @IsOptional()
  @IsIn(['M', 'P'])
  type?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  itemId?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  unused?: boolean;
}
