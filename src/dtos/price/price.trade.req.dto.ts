import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Source } from 'src/lib/enums';

export class PriceTradeRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;

  @IsOptional()
  @IsEnum(Source)
  source?: Source;
}
