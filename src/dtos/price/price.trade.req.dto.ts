import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TradeSource } from 'src/lib/enums';

export class PriceTradeRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  unused?: boolean = false;

  @IsOptional()
  @IsEnum(TradeSource)
  source?: TradeSource;
}
