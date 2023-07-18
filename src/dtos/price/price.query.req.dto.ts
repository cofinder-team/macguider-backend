import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PriceQueryRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;
}
