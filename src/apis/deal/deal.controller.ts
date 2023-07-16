import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Put,
  StreamableFile,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import {
  DealRawRequestDto,
  DealRawResponseDto,
  DealResponseDto,
} from 'src/dtos';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getDeals(): Promise<DealResponseDto[]> {
    const deals = await this.dealService.getDeals();
    return deals.map(DealResponseDto.of);
  }

  @Get('/:id/image')
  @Header('Content-Type', 'image/jpeg')
  async getDealImage(@Param('id') id: number) {
    const buffer = await this.dealService.getDealImage(id);
    const readable = Readable.from(buffer);
    return new StreamableFile(readable);
  }

  @Get('/raw/:id')
  async getDealRaw(@Param('id') id: number): Promise<DealRawResponseDto> {
    const dealRaw = await this.dealService.getDealRaw(id);
    return DealRawResponseDto.of(dealRaw);
  }

  @Put('/raw/:id')
  async convertDealFromRaw(
    @Param('id') id: number,
    @Body() body: DealRawRequestDto,
  ): Promise<void> {
    await this.dealService.getDealRaw(id);

    const { valid, ...payload } = body;
    if (valid) {
      await this.dealService.createDeal(id, payload);
    }

    await this.dealService.classifyDealRaw(id);
  }
}
