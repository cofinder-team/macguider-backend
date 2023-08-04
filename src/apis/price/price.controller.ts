import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import {
  ItemDto,
  PriceCoupangRequestDto,
  PriceCoupangResponseDto,
  PriceRegularRequestDto,
  PriceRegularResponseDto,
  PriceTradeRequestDto,
  PriceTradeResponseDto,
} from 'src/dtos';

@Controller('price')
export class PriceController {
  constructor(private readonly itemService: PriceService) {}

  @Get('/regular/:type/:id')
  async getRegularPrices(
    @Param() item: ItemDto,
    @Query() query: PriceRegularRequestDto,
  ): Promise<PriceRegularResponseDto[] | PriceRegularResponseDto> {
    const { type, id } = item;
    const { singular } = query;

    const options = { type, id };

    if (singular) {
      const price = await this.itemService.getRecentRegularPrice(options);
      return PriceRegularResponseDto.of(price);
    } else {
      const prices = await this.itemService.getRegularPrices(options);
      return prices.map(PriceRegularResponseDto.of);
    }
  }

  @Get('/coupang/:type/:id')
  async getCoupangPrices(
    @Param() item: ItemDto,
    @Query() query: PriceCoupangRequestDto,
  ): Promise<PriceCoupangResponseDto[] | PriceCoupangResponseDto> {
    const { type, id } = item;
    const { singular } = query;

    const options = { type, id };

    if (singular) {
      const price = await this.itemService.getRecentCoupangPrice(options);
      return PriceCoupangResponseDto.of(price);
    } else {
      const prices = await this.itemService.getCoupangPrices(options);
      return prices.map(PriceCoupangResponseDto.of);
    }
  }

  @Get('/trade/:type/:id')
  async getTradePrices(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto[] | PriceTradeResponseDto> {
    const { type, id } = item;
    const { singular, unused, source } = query;

    const options = { type, id, unused, source };

    if (singular) {
      const price = await this.itemService.getRecentTradePrice(options);
      return PriceTradeResponseDto.of(price);
    } else {
      const prices = await this.itemService.getTradePrices(options);
      return prices.map(PriceTradeResponseDto.of);
    }
  }

  @Get('/deal/:type/:id')
  async getPrice(
    @Param() params: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto> {
    const { type, id } = params;
    const { unused } = query;

    const options = { type, id, unused };

    const price = await this.itemService.getRecentTradePrice(options);
    return PriceTradeResponseDto.of(price);
  }
}
