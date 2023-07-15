import { Deal } from 'src/entities';

export class DealResponseDto {
  id: number;
  date: Date;
  price?: number;
  sold: boolean;
  unopened: boolean;
  source: string;
  url: string;

  static of(deal: Deal): DealResponseDto {
    const { id, date, price, sold, unopened, source, url } = deal;
    return { id, date, price, sold, unopened, source, url };
  }
}
