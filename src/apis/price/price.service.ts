import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(PriceRegular)
    private readonly priceRegularRepository: Repository<PriceRegular>,
    @InjectRepository(PriceCoupang)
    private readonly priceCoupangRepository: Repository<PriceCoupang>,
    @InjectRepository(PriceTrade)
    private readonly priceTradeRepository: Repository<PriceTrade>,
  ) {}

  async getRegularPrices(
    options: FindOptionsWhere<PriceRegular>,
  ): Promise<PriceRegular[]> {
    const where: FindOptionsWhere<PriceRegular> = { ...options };
    const order: FindOptionsOrder<PriceRegular> = { date: 'ASC' };

    return this.priceRegularRepository.find({ where, order });
  }

  async getRecentRegularPrice(
    options: FindOptionsWhere<PriceRegular>,
  ): Promise<PriceRegular> {
    const where: FindOptionsWhere<PriceRegular> = { ...options };
    const order: FindOptionsOrder<PriceRegular> = { date: 'DESC' };

    return this.priceRegularRepository.findOne({ where, order });
  }

  async getCoupangPrices(
    options: FindOptionsWhere<PriceCoupang>,
  ): Promise<PriceCoupang[]> {
    const where: FindOptionsWhere<PriceCoupang> = { ...options };
    const order: FindOptionsOrder<PriceCoupang> = { date: 'ASC' };

    return this.priceCoupangRepository.find({ where, order });
  }

  async getRecentCoupangPrice(
    options: FindOptionsWhere<PriceCoupang>,
  ): Promise<PriceCoupang> {
    const where: FindOptionsWhere<PriceCoupang> = { ...options };
    const order: FindOptionsOrder<PriceCoupang> = { date: 'DESC' };

    return this.priceCoupangRepository.findOne({ where, order });
  }

  async getTradePrices(
    options: FindOptionsWhere<PriceTrade>,
  ): Promise<PriceTrade[]> {
    const where: FindOptionsWhere<PriceTrade> = {
      source: IsNull(),
      ...options,
    };
    const order: FindOptionsOrder<PriceTrade> = { date: 'ASC' };

    return this.priceTradeRepository.find({ where, order });
  }

  async getRecentTradePrice(
    options: FindOptionsWhere<PriceTrade>,
  ): Promise<PriceTrade> {
    const where: FindOptionsWhere<PriceTrade> = {
      source: IsNull(),
      ...options,
    };
    const order: FindOptionsOrder<PriceTrade> = { date: 'DESC' };

    return this.priceTradeRepository.findOne({ where, order });
  }
}
