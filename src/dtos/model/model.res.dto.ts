import { Model } from 'src/entities';

export class ModelResponseDto {
  id: number;
  name: string;

  static of(model: Model): ModelResponseDto {
    const { id, name } = model;
    return { id, name };
  }
}
