import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common/pagination.dto';
import { ItemType } from 'src/lib/enums/item.type.enum';

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

  @IsIn(['중고나라', '번개장터'])
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  direction?: string;
}
