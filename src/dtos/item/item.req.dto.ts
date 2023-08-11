import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { ItemOptionsDto } from '../common';

export class ItemRequestDto extends ItemOptionsDto {
  @IsIn(['M', 'P'])
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  model?: number;
}
