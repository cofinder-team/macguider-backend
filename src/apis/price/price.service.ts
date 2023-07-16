import { Injectable } from '@nestjs/common';
import { PriceTrade } from 'src/entities';
import { PriceTradeRepository } from 'src/repositories';

@Injectable()
export class PriceService {
  constructor(private readonly priceTradeRepository: PriceTradeRepository) {}
  async getPrice(
    type: string,
    id: number,
    unused: boolean,
  ): Promise<PriceTrade> {
    return this.priceTradeRepository.findOne({
      where: { type, id, unused },
      order: { date: 'DESC' },
    });
  }
}
