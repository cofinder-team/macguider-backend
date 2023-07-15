import { Deal } from 'src/entities';

export class DealResponseDto {
  id: number;
  type: string;
  itemId: number;
  date: Date;
  price?: number;
  sold: boolean;
  unopened: boolean;
  source: string;
  url: string;

  static of(deal: Deal): DealResponseDto {
    const { id, type, itemId, date, price, sold, unopened, source, url } = deal;
    return { id, type, itemId, date, price, sold, unopened, source, url };
  }
}
