import { Controller, Get } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealResponseDto } from 'src/dtos';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getDeals(): Promise<DealResponseDto[]> {
    const deals = await this.dealService.getDeals();
    return deals.map(DealResponseDto.of);
  }
}
