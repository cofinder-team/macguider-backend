import { IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';

export class MacbookOptionsDto {
  @IsIn(['M1', 'M1PRO', 'M1MAX', 'M2', 'M2PRO', 'M2MAX'])
  @IsOptional()
  chip?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cpu?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  gpu?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ram?: number;

  @IsIn(['256GB', '512GB', '1TB', '2TB', '4TB'])
  @IsOptional()
  @Type(() => Number)
  ssd?: string;
}

export class IpadOptionsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  gen?: number;

  @IsIn(['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'])
  @IsOptional()
  storage?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  cellular?: boolean;
}

export class IphoneOptionsDto {
  @IsIn(['DEFAULT', 'MINI', 'PLUS', 'PRO', 'PROMAX'])
  @IsOptional()
  modelSuffix?: string;

  @IsIn(['64GB', '128GB', '256GB', '512GB', '1TB'])
  @IsOptional()
  storage?: string;
}

export class ItemOptionsDto extends IntersectionType(
  MacbookOptionsDto,
  IpadOptionsDto,
  IphoneOptionsDto,
) {}
