import { DealRaw } from 'src/entities';

export class DealRawResponseDto {
  id: number;
  url: string;
  type: string;
  itemId: number;
  unused: boolean;
  price: number;

  static of(dealRaw: DealRaw): DealRawResponseDto {
    const { id, url, type, itemId, unused, price } = dealRaw;
    return { id, url, type, itemId, unused, price };
  }
}
