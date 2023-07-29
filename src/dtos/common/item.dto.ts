import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class ItemDto {
  @IsIn(['M', 'P'])
  type: string;

  @IsNumber()
  @Type(() => Number)
  id: number;
}
