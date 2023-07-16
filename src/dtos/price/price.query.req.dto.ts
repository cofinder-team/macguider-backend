import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PriceQueryRequestDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  unused?: boolean = false;
}
