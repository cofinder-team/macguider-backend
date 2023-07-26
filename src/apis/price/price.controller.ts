import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import { ItemDto, PriceRequestDto, PriceResponseDto } from 'src/dtos';
import { IsNull } from 'typeorm';

@Controller('price')
export class PriceController {
  constructor(private readonly itemService: PriceService) {}

  @Get('/trade/:type/:id')
  async getTradePrices(
    @Param() item: ItemDto,
    @Query() query: PriceRequestDto,
  ): Promise<PriceResponseDto[] | PriceResponseDto> {
    const { type, id } = item;
    const { unused, singular, source } = query;

    const options = { type, id, unused, source: source ?? IsNull() };

    if (singular) {
      const price = await this.itemService.getRecentTradePrice(options);
      return PriceResponseDto.of(price);
    } else {
      const prices = await this.itemService.getTradePrices(options);
      return prices.map(PriceResponseDto.of);
    }
  }

  @Get('/deal/:type/:id')
  async getPrice(
    @Param() params: ItemDto,
    @Query() query: PriceRequestDto,
  ): Promise<PriceResponseDto> {
    const { type, id } = params;
    const { unused } = query;

    const options = { type, id, unused, source: IsNull() };

    const price = await this.itemService.getRecentTradePrice(options);
    return PriceResponseDto.of(price);
  }
}
