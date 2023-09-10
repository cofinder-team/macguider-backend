import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { ItemCondition, ItemType, TradeSource } from 'src/lib/enums';

export class DealCreateRequestDto {
  @IsEnum(ItemType)
  type: ItemType;

  @IsNumber()
  itemId: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  price: number;

  @IsBoolean()
  unused: boolean;

  @IsEnum(TradeSource)
  source: TradeSource;

  @IsUrl()
  url: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  writer: string;

  @IsBoolean()
  appleCare: boolean;

  @IsEnum(ItemCondition)
  condition: ItemCondition;

  @IsUrl()
  imageUrl: string;
}
