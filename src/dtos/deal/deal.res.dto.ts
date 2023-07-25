import { DealFiltered, ItemDetailEntity } from 'src/entities';
import { ItemResponseDto } from '../item';

export class DealResponseDto {
  id: number;
  item?: ItemResponseDto;
  date: Date;
  price: number;
  sold: boolean;
  unused: boolean;
  source: string;
  url: string;
  average: number;

  static of(deal: DealFiltered): DealResponseDto {
    const { id, item, date, price, sold, unused, source, url, average } = deal;

    const { macbook, ipad } = item;
    const itemDetail: ItemDetailEntity = macbook || ipad || undefined;

    return {
      id,
      item: ItemResponseDto.of(itemDetail),
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
