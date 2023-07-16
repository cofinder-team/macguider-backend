import { DealRaw } from 'src/entities';

export class DealRawResponseDto {
  id: number;
  url: string;
  type: string;
  itemId: number;

  static of(dealRaw: DealRaw): DealRawResponseDto {
    const { id, url, type, itemId } = dealRaw;
    return { id, url, type, itemId };
  }
}
