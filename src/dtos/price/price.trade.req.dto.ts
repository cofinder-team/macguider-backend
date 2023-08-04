import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PriceRequestDto } from './price.req.dto';

export class PriceTradeRequestDto extends PriceRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unused?: boolean = false;

  @IsOptional()
  @IsString()
  source?: string;
}
