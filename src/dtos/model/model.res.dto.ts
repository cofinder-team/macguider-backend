import { Model } from 'src/entities';
import { ItemResponseDto } from '../item';

export class ModelResponseDto {
  type: string;
  id: number;
  name: string;
  mainItem?: ItemResponseDto;

  static of(model: Model): ModelResponseDto {
    const { type, id, name, mainItem } = model;

    return {
      type,
      id,
      name,
      mainItem: mainItem ? ItemResponseDto.of(mainItem) : undefined,
    };
  }
}
