import { PriceRegular } from 'src/entities';

export class PriceRegularResponseDto {
  date: Date;
  price: number;
  log: Date;

  static of(regularPrice: PriceRegular): PriceRegularResponseDto {
    const { date, price, log } = regularPrice;
    return { date, price, log };
  }
}
