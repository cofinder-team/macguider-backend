import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export abstract class PriceRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  singular?: boolean = false;
}
