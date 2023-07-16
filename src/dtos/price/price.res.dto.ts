import { PriceTrade } from 'src/entities';

export class PriceResponseDto {
  average: number;
  price_20: number;
  price_80: number;
  cnt: number;

  static of(price: PriceTrade): PriceResponseDto {
    const { average, price_20, price_80, cnt } = price;
    return { average, price_20, price_80, cnt };
  }
}
