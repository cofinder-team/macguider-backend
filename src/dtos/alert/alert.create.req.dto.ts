import { Transform } from 'class-transformer';
import { ItemDto } from '../common';

export class AlertCreateRequestDto extends ItemDto {
  @Transform(({ value }) => value === 'true')
  unused: boolean;
}
