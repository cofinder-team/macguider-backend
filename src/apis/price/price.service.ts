import { Injectable } from '@nestjs/common';
import { PriceTrade } from 'src/entities';
import { PriceTradeRepository } from 'src/repositories';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(private readonly priceTradeRepository: PriceTradeRepository) {}

  async getTradePrices(
    options: FindOptionsWhere<PriceTrade>,
  ): Promise<PriceTrade[]> {
    const where: FindOptionsWhere<PriceTrade> = { ...options };
    const order: FindOptionsOrder<PriceTrade> = { date: 'ASC' };

    return this.priceTradeRepository.find({ where, order });
  }

  async getRecentTradePrice(
    options: FindOptionsWhere<PriceTrade>,
  ): Promise<PriceTrade> {
    const where: FindOptionsWhere<PriceTrade> = { ...options };
    const order: FindOptionsOrder<PriceTrade> = { date: 'DESC' };

    return this.priceTradeRepository.findOne({ where, order });
  }
}
