import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ItemType } from 'src/lib/enums';

export class DealSearchRequestDto {
  @IsEnum(ItemType)
  type: ItemType;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  itemId: number;

  @IsString()
  writer: string;
}
