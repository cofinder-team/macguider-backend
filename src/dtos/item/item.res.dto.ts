import { Item, ItemDetailEntity } from 'src/entities';
import { ModelResponseDto } from './model.res.dto';
import { ImageResponseDto } from './image.res.dto';

export class ItemResponseDto {
  type: string;
  id: number;
  image?: ImageResponseDto;
  model?: ModelResponseDto;
  option?: number;
  details?: object;

  static of(item: Item): ItemResponseDto {
    const extract = (entity: ItemDetailEntity): Partial<ItemResponseDto> => {
      if (!entity) {
        return {};
      }

      const { type, id, option, model, modelEntity, ...details } = entity;

      return {
        type,
        id,
        model: model ? ModelResponseDto.of(modelEntity) : undefined,
        option,
        details,
      };
    };

    const { type, id, image, macbook, ipad, iphone } = item;
    const details: ItemDetailEntity = macbook || ipad || iphone || undefined;

    return {
      type,
      id,
      image: image ? ImageResponseDto.of(image) : undefined,
      ...extract(details),
    };
  }
}
