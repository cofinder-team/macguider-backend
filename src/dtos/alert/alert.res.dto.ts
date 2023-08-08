import { AlertTarget } from 'src/entities';
import { ItemResponseDto } from '../item';

export class AlertResponseDto {
  id: number;
  item: ItemResponseDto;
  unused: boolean;
  userId: number;
  uuid?: string;

  static of(alert: AlertTarget): AlertResponseDto {
    const { id, type, itemId, unused, userId, uuid, item } = alert;

    return {
      id,
      item: { ...(item ? ItemResponseDto.of(item) : { type, id: itemId }) },
      unused,
      userId,
      uuid,
    };
  }
}
