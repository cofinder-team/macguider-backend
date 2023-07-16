import { ItemDetailEntity } from 'src/entities';

export class ItemResponseDto {
  type: string;
  id: number;
  model: number;
  option: number;
  details: object;

  static of(item: ItemDetailEntity): ItemResponseDto {
    const { type, id, model, option, ...details } = item;
    return { type, id, model, option, details };
  }
}
