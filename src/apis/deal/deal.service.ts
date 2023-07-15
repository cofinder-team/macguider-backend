import { Injectable } from '@nestjs/common';
import { DealRepository } from 'src/repositories';

@Injectable()
export class DealService {
  constructor(private readonly dealrepository: DealRepository) {}
}
