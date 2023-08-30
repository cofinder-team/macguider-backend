import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { ItemOptionsDto } from '../common';
import { ItemType } from 'src/lib/enums';

export class ItemRequestDto extends ItemOptionsDto {
  @IsEnum(ItemType)
  @IsOptional()
  type?: ItemType;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  model?: number;
}
