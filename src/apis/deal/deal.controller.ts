import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import {
  DealRawRequestDto,
  DealRawResponseDto,
  DealRequestDto,
  DealResponseDto,
} from 'src/dtos';
import { paginate } from 'src/lib/utils/pagination.util';
import { getTypeName } from 'src/lib/utils/type.util';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getDeals(@Query() query: DealRequestDto): Promise<DealResponseDto[]> {
    const { type, model, ...pagination } = query;

    const options = type
      ? { type, item: { [getTypeName(type)]: { model } } }
      : {};

    const deals = await this.dealService.getDealsByOptions(
      options,
      paginate(pagination),
    );

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
