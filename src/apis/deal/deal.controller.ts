import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { DealService } from './deal.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import { DealResponseDto } from 'src/dtos';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getDeals(): Promise<DealResponseDto[]> {
    const deals = await this.dealService.getDeals();
    return deals.map(DealResponseDto.of);
  }

  @Get('/:id')
  async getDeal(@Param('id') id: number): Promise<DealResponseDto> {
    const deal = await this.dealService.getDeal(id);
    return DealResponseDto.of(deal);
  }

  @Get('/:id/image')
  @Header('Content-Type', 'image/jpeg')
  async getDealImage(@Param('id') id: number) {
    const buffer = await this.dealService.getDealImage(id);
    const readable = Readable.from(buffer);
    return new StreamableFile(readable);
  }
}
