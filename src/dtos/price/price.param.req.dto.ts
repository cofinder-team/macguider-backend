import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class PriceParamRequestDto {
  @IsIn(['M', 'P'])
  type: string;

  @IsNumber()
  @Type(() => Number)
  id: number;
}
