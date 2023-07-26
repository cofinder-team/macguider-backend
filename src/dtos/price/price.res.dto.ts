import { PriceTrade } from 'src/entities';

export class PriceResponseDto {
  date: Date;
  average: number;
  price_20: number;
  price_80: number;
  cnt: number;

  static of(price: PriceTrade): PriceResponseDto {
    const { date, average, price_20, price_80, cnt } = price;
    return { date, average, price_20, price_80, cnt };
  }
}
