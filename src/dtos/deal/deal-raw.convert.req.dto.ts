import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ItemType } from 'src/lib/enums/item.type.enum';

export class DealRawConvertRequestDto {
  @IsBoolean()
  valid: boolean;

  @IsOptional()
  @IsEnum(ItemType)
  type?: ItemType;

  @IsOptional()
  @IsNumber()
  itemId?: number;

  @IsOptional()
  @IsBoolean()
  unused?: boolean;
}
