import {
  Deal,
  DealFiltered,
  PriceCoupang,
  PriceRegular,
  PriceTrade,
} from 'src/entities';
import { ItemResponseDto } from '../item';
import { PriceTradeResponseDto } from '../price/price.trade.res.dto';
import { PriceCoupangResponseDto, PriceRegularResponseDto } from '../price';
import { ImageResponseDto } from '../common';

export class DealResponseDto {
  id: number;
  item: ItemResponseDto;
  date: Date;
  price: number;
  sold: boolean;
  unused: boolean;
  source: string;
  url: string;
  image?: ImageResponseDto;

  static of(deal: Deal): DealResponseDto {
    const {
      id,
      type,
      itemId,
      item,
      date,
      price,
      sold,
      unused,
      source,
      url,
      imageEntity,
    } = deal;

    return {
      id,
      item: { ...(item ? ItemResponseDto.of(item) : { type, id: itemId }) },
      date,
      price,
      sold,
      unused,
      source,
      url,
      image: imageEntity ? ImageResponseDto.of(imageEntity) : undefined,
    };
  }
}

export class DealFilteredResponseDto extends DealResponseDto {
  tradePrice: Pick<PriceTradeResponseDto, 'average'>;

  static of(deal: DealFiltered): DealFilteredResponseDto {
    const { average } = deal;
    return { ...super.of(deal), tradePrice: { average } };
  }
}

export class DealDetailResponseDto extends DealResponseDto {
  regularPrice: PriceRegularResponseDto;
  coupangPrice: PriceCoupangResponseDto;
  tradePrice: PriceTradeResponseDto;

  static of(
    deal: Deal & {
      regularPrice: PriceRegular;
      coupangPrice: PriceCoupang;
      tradePrice: PriceTrade;
    },
  ): DealDetailResponseDto {
    const { regularPrice, coupangPrice, tradePrice } = deal;

    return {
      ...super.of(deal),
      regularPrice: PriceRegularResponseDto.of(regularPrice),
      coupangPrice: PriceCoupangResponseDto.of(coupangPrice),
      tradePrice: PriceTradeResponseDto.of(tradePrice),
    };
  }
}

export class DealOriginResponseDto extends DealResponseDto {
  pending: boolean;
  title: string;
  content: string;
  writer: string;
  tradePrice: PriceTradeResponseDto;

  static of(deal: Deal & { tradePrice: PriceTrade }): DealOriginResponseDto {
    const { pending, title, content, writer, tradePrice } = deal;
    return {
      ...super.of(deal),
      pending,
      title,
      content,
      writer,
      tradePrice: PriceTradeResponseDto.of(tradePrice),
    };
  }
}
