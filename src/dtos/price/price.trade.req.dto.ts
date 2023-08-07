import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class PriceTradeRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;

  @IsOptional()
  @IsString()
  @IsIn(['중고나라', '번개장터'])
  source?: string;
}
