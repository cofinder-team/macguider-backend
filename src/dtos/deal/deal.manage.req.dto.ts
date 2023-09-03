import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ItemType } from 'src/lib/enums';

export class DealManageRequestDto {
  @IsBoolean()
  remove: boolean;

  @IsOptional()
  @IsEnum(ItemType)
  type?: ItemType;

  @IsOptional()
  @IsNumber()
  itemId?: number;

  @IsOptional()
  @IsBoolean()
  unused?: boolean;

  @IsOptional()
  @IsBoolean()
  sold?: boolean;

  @IsOptional()
  @IsBoolean()
  appleCare?: boolean;

  @IsOptional()
  @IsNumber()
  price?: number;
}
