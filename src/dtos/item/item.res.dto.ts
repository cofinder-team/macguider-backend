import { Item, ItemDetailEntity } from 'src/entities';
import { ModelResponseDto } from './model.res.dto';

export class ItemResponseDto {
  type: string;
  id: number;
  model?: ModelResponseDto;
  option?: number;
  details?: object;

  static of(item: Item): ItemResponseDto {
    const { macbook, ipad, iphone } = item;
    const itemDetail: ItemDetailEntity = macbook || ipad || iphone || undefined;

    if (!itemDetail) {
      const { type, id } = item;
      return { type, id };
    }

    const { type, id, option, model, modelEntity, ...details } = itemDetail;
    return {
      type,
      id,
      ...(model ? { model: ModelResponseDto.of(modelEntity) } : {}),
      option,
      details,
    };
  }
}
