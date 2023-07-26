import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PriceRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  singular?: boolean = false;

  @IsOptional()
  @IsString()
  source?: string;
}
