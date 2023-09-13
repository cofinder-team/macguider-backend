import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class DealStateRequestDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === true || value === 'true';
  })
  pending?: boolean;
}
