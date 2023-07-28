import { ItemDetailEntity } from 'src/entities';
import { ModelResponseDto } from './model.res.dto';

export class ItemResponseDto {
  type: string;
  id: number;
  model: Partial<ModelResponseDto>;
  option: number;
  details: object;

  static of(item: ItemDetailEntity): ItemResponseDto {
    const { type, id, option, model: modelId, modelEntity, ...details } = item;

    const model = modelEntity
      ? ModelResponseDto.of(modelEntity)
      : { id: modelId };

    return { type, id, model, option, details };
  }
}
