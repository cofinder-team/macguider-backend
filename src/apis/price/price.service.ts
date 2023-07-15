import { Injectable } from '@nestjs/common';
import { PriceTradeRepository } from 'src/repositories';

@Injectable()
export class PriceService {
  constructor(private readonly priceTradeRepository: PriceTradeRepository) {}
}
