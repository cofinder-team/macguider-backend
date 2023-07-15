import { Injectable } from '@nestjs/common';
import { Deal } from 'src/entities';
import { DealRepository } from 'src/repositories';

@Injectable()
export class DealService {
  constructor(private readonly dealrepository: DealRepository) {}

  async getDeals(): Promise<Deal[]> {
    return this.dealrepository.find();
  }
}
