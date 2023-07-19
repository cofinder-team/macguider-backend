import { DealFiltered } from 'src/entities';

export class DealResponseDto {
  id: number;
  type: string;
  itemId: number;
  date: Date;
  price: number;
  sold: boolean;
  unused: boolean;
  source: string;
  url: string;
  average: number;

  static of(deal: DealFiltered): DealResponseDto {
    const {
      id,
      type,
      itemId,
      date,
      price,
      sold,
      unused,
      source,
      url,
      average,
    } = deal;
    return {
      id,
      type,
      itemId,
      date,
      price,
      sold,
      unused,
      source,
      url,
      average,
    };
  }
}
