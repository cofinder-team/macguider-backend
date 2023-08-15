import { IsBoolean } from 'class-validator';
import { ItemDto } from '../common';

export class AlertCreateRequestDto extends ItemDto {
  @IsBoolean()
  unused: boolean;
}
