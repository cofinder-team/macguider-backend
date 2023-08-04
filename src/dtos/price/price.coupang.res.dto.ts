import { PriceCoupang } from 'src/entities';

export class PriceCoupangResponseDto {
  date: Date;
  price: number;
  log: Date;

  static of(coupangPrice: PriceCoupang): PriceCoupangResponseDto {
    const { date, price, log } = coupangPrice;
    return { date, price, log };
  }
}
