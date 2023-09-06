import { IsEnum, IsOptional } from 'class-validator';
import { ItemType } from 'src/lib/enums';

export class ModelRequestDto {
  @IsEnum(ItemType)
  @IsOptional()
  type?: ItemType;
}
