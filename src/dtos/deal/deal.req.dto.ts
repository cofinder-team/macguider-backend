import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common/pagination.dto';
import { ItemType } from 'src/lib/enums/item.type.enum';
import { Source } from 'src/lib/enums/source.enum';

export class DealRequestDto extends PaginationDto {
  @IsEnum(ItemType)
  @IsOptional()
  type?: ItemType;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  model?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  itemId?: number;

  @IsEnum(Source)
  @IsOptional()
  source?: Source;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  direction?: string;
}
