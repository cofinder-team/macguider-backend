import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class DealRemoveRequestDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  sold?: boolean = false;
}
