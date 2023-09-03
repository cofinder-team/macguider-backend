import { DealRaw } from 'src/entities';

export class DealRawResponseDto {
  id: number;
  url: string;
  type: string;
  itemId: number;
  unused: boolean;
  price: number;
  title: string;
  content: string;

  static of(dealRaw: DealRaw): DealRawResponseDto {
    const { id, url, type, itemId, unused, price, title, content } = dealRaw;
    return { id, url, type, itemId, unused, price, title, content };
  }
}
