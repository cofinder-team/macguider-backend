import { ItemDetailEntity } from 'src/entities';
import { ModelResponseDto } from './model.res.dto';

export class ItemResponseDto {
  type: string;
  id: number;
  model?: ModelResponseDto;
  option: number;
  details: object;

  static of(item: ItemDetailEntity): ItemResponseDto {
    const { type, id, option, model, modelEntity, ...details } = item;

    return {
      type,
      id,
      ...(model && modelEntity
        ? { model: ModelResponseDto.of(modelEntity) }
        : {}),
      option,
      details,
    };
  }
}
