import { AlertTarget } from 'src/entities';

export class AlertResponseDto {
  id: number;
  type: string;
  itemId: number;
  unused: boolean;
  userId: number;
  uuid: string;

  static of(alert: AlertTarget): AlertResponseDto {
    const { id, type, itemId, unused, userId, uuid } = alert;

    return { id, type, itemId, unused, userId, uuid };
  }
}
