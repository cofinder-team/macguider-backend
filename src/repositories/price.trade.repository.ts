import { Injectable } from '@nestjs/common';
import { PriceTrade } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PriceTradeRepository extends Repository<PriceTrade> {
  constructor(private dataSource: DataSource) {
    super(PriceTrade, dataSource.createEntityManager());
  }
}
