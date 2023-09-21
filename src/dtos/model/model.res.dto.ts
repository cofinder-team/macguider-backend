import { Model } from 'src/entities';
import { ItemResponseDto } from '../item';
import { ModelHistoryResponseDto } from './model.history.res.dto';

export class ModelResponseDto {
  type: string;
  id: number;
  name: string;
  mainItem?: ItemResponseDto;
  histories?: ModelHistoryResponseDto[];

  static of(model: Model): ModelResponseDto {
    const { type, id, name, mainItem, histories } = model;

    return {
      type,
      id,
      name,
      mainItem: mainItem ? ItemResponseDto.of(mainItem) : undefined,
      histories: histories
        ? histories.map(ModelHistoryResponseDto.of)
        : undefined,
    };
  }
}

export class ModelDetailResponseDto extends ModelResponseDto {
  description: string;

  static of(model: Model): ModelDetailResponseDto {
    const { description } = model;

    return {
      ...super.of(model),
      description,
    };
  }
}
