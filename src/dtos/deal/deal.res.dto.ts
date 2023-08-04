import { Deal, ItemDetailEntity } from 'src/entities';
import { ItemResponseDto } from '../item';

abstract class DealAbstractResponseDto {
  id: number;
  item?: ItemResponseDto;
  date: Date;
  price: number;
  sold: boolean;
  unused: boolean;
  source: string;
  url: string;

  static of(deal: Deal): DealAbstractResponseDto {
    const { id, item, date, price, sold, unused, source, url } = deal;

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
    };
  }
}

export class DealResponseDto extends DealAbstractResponseDto {
  static of(deal: Deal): DealResponseDto {
    return {
      ...super.of(deal),
    };
  }
}
