import { IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Chip, IphoneSuffix, Ssd, Storage } from 'src/lib/enums';

export class MacbookOptionsDto {
  @IsEnum(Chip)
  @IsOptional()
  chip?: Chip;

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

  @IsEnum(Ssd)
  @IsOptional()
  ssd?: Ssd;
}

export class IpadOptionsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  gen?: number;

  @IsEnum(Storage)
  @IsOptional()
  storage?: Storage;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  cellular?: boolean;

  @IsEnum(Chip)
  @IsOptional()
  chip?: Chip;
}

export class IphoneOptionsDto {
  @IsEnum(IphoneSuffix)
  @IsOptional()
  modelSuffix?: IphoneSuffix;

  @IsEnum(Storage)
  @IsOptional()
  storage?: Storage;
}

export class ItemOptionsDto extends IntersectionType(
  MacbookOptionsDto,
  IpadOptionsDto,
  IphoneOptionsDto,
) {}
