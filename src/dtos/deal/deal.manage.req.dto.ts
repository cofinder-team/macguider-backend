import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';

export class DealManageRequestDto {
  @IsBoolean()
  remove: boolean;

  @IsOptional()
  @IsIn(['M', 'P'])
  type?: string;

  @IsOptional()
  @IsNumber()
  itemId?: number;

  @IsOptional()
  @IsBoolean()
  unused?: boolean;
}
