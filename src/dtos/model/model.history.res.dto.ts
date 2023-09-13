import { ModelHistory } from 'src/entities';

export class ModelHistoryResponseDto {
  date: Date;
  info: string;

  static of(modelHistory: ModelHistory): ModelHistoryResponseDto {
    const { date, info } = modelHistory;

    return {
      date,
      info,
    };
  }
}
