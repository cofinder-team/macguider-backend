import { PriceTrade } from 'src/entities';

export class PriceTradeResponseDto {
  date: Date;
  average: number;
  price_20: number;
  price_80: number;
  cnt: number;

  static of(price: PriceTrade): PriceTradeResponseDto {
    const { date, average, price_20, price_80, cnt } = price;
    return { date, average, price_20, price_80, cnt };
  }
}
