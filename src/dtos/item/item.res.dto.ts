import { Item, ItemDetailEntity } from 'src/entities';
import { ModelResponseDto } from './model.res.dto';

export class ItemResponseDto {
  type: string;
  id: number;
  model?: ModelResponseDto;
  option?: number;
  details?: object;

  static of(item: Item): ItemResponseDto {
    const { type, id, macbook, ipad } = item;

    const itemDetail: ItemDetailEntity = macbook || ipad || undefined;
    if (!itemDetail) return { type, id };

    const { option, model, modelEntity, ...details } = itemDetail;
    return {
      type,
      id,
      ...(model ? { model: ModelResponseDto.of(modelEntity) } : {}),
      option,
      details,
    };
  }
}
