import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PriceRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;
}
