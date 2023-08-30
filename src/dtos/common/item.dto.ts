import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { ItemType } from 'src/lib/enums';

export class ItemDto {
  @IsEnum(ItemType)
  type: ItemType;

  @IsNumber()
  @Type(() => Number)
  id: number;
}
