import { IsUUID } from 'class-validator';

export class AlertRemoveRequestDto {
  @IsUUID(4)
  uuid: string;
}
