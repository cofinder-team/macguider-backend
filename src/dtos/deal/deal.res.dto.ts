import {
  Deal,
  DealFiltered,
  ItemDetailEntity,
  PriceCoupang,
  PriceRegular,
  PriceTrade,
} from 'src/entities';
import { ItemResponseDto } from '../item';
import { PriceTradeResponseDto } from '../price/price.trade.res.dto';
import { PriceCoupangResponseDto, PriceRegularResponseDto } from '../price';

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

export class DealFilteredResponseDto extends DealAbstractResponseDto {
  tradePrice: Pick<PriceTradeResponseDto, 'average'>;

  static of(deal: DealFiltered): DealFilteredResponseDto {
    const { average } = deal;
    return { ...super.of(deal), tradePrice: { average } };
  }
}

export class DealResponseDto extends DealAbstractResponseDto {
  regularPrice: PriceRegularResponseDto;
  coupangPrice: PriceCoupangResponseDto;
  tradePrice: PriceTradeResponseDto;

  static of(
    deal: Deal & {
      regularPrice: PriceRegular;
      coupangPrice: PriceCoupang;
      tradePrice: PriceTrade;
    },
  ): DealResponseDto {
    const { regularPrice, coupangPrice, tradePrice } = deal;

    return {
      ...super.of(deal),
      regularPrice: PriceRegularResponseDto.of(regularPrice),
      coupangPrice: PriceCoupangResponseDto.of(coupangPrice),
      tradePrice: PriceTradeResponseDto.of(tradePrice),
    };
  }
}
