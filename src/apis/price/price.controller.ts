import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import {
  ItemDto,
  PriceCoupangResponseDto,
  PriceRegularResponseDto,
  PriceTradeRequestDto,
  PriceTradeResponseDto,
} from 'src/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('price')
@ApiTags('price')
export class PriceController {
  constructor(private readonly itemService: PriceService) {}

  @Get('/regular/:type/:id')
  async getRegularPrices(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto[]> {
    const { type, id } = item;
    const options = { type, id };

    const prices = await this.itemService.getRegularPrices(options);
    return prices.map(PriceRegularResponseDto.of);
  }

  @Get('/regular/:type/:id/recent')
  async getRecentRegularPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const { type, id } = item;
    const options = { type, id };

    const price = await this.itemService.getRecentRegularPrice(options);
    return PriceRegularResponseDto.of(price);
  }

  @Get('/coupang/:type/:id')
  async getCoupangPrices(
    @Param() item: ItemDto,
  ): Promise<PriceCoupangResponseDto[]> {
    const { type, id } = item;
    const options = { type, id };

    const prices = await this.itemService.getCoupangPrices(options);
    return prices.map(PriceCoupangResponseDto.of);
  }

  @Get('/coupang/:type/:id/recent')
  async getRecentCoupangPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const { type, id } = item;
    const options = { type, id };

    const price = await this.itemService.getRecentCoupangPrice(options);
    return PriceCoupangResponseDto.of(price);
  }

  @Get('/trade/:type/:id')
  async getTradePrices(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto[]> {
    const { type, id } = item;
    const { unused, source } = query;

    const options = { type, id, unused, source };

    const prices = await this.itemService.getTradePrices(options);
    return prices.map(PriceTradeResponseDto.of);
  }

  @Get('/trade/:type/:id/recent')
  async getRecentTradePrice(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto> {
    const { type, id } = item;
    const { unused, source } = query;

    const options = { type, id, unused, source };

    const price = await this.itemService.getRecentTradePrice(options);
    return PriceTradeResponseDto.of(price);
  }

  @Get('/deal/:type/:id')
  @ApiOperation({ deprecated: true })
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
