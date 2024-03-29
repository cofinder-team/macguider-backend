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
import { ItemService } from '../item/item.service';

@Controller('price')
@ApiTags('price')
export class PriceController {
  constructor(
    private readonly priceService: PriceService,
    private readonly itemService: ItemService,
  ) {}

  @Get('/regular/:type/:id')
  @ApiOperation({ summary: '최근 1년간 정품 가격 정보 조회' })
  async getRegularPrices(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto[]> {
    const options = { ...item };
    await this.itemService.existsItem(item);

    const prices = await this.priceService.getRegularPrices(options);
    return prices.map(PriceRegularResponseDto.of);
  }

  @Get('/regular/:type/:id/recent')
  @ApiOperation({ summary: '최신 정품 가격 조회' })
  async getRecentRegularPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const options = { ...item };
    await this.itemService.existsItem(item);

    const price = await this.priceService.getRecentRegularPrice(options);
    return PriceRegularResponseDto.of(price);
  }

  @Get('/coupang/:type/:id')
  @ApiOperation({ summary: '최근 1년간 쿠팡 가격 조회' })
  async getCoupangPrices(
    @Param() item: ItemDto,
  ): Promise<PriceCoupangResponseDto[]> {
    const options = { ...item };
    await this.itemService.existsItem(item);

    const prices = await this.priceService.getCoupangPrices(options);
    return prices.map(PriceCoupangResponseDto.of);
  }

  @Get('/coupang/:type/:id/recent')
  @ApiOperation({ summary: '최신 쿠팡 가격 조회' })
  async getRecentCoupangPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const options = { ...item };
    await this.itemService.existsItem(item);

    const price = await this.priceService.getRecentCoupangPrice(options);
    return PriceCoupangResponseDto.of(price);
  }

  @Get('/trade/:type/:id')
  @ApiOperation({ summary: '최근 1년간 거래 가격 조회' })
  async getTradePrices(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto[]> {
    const options = { ...item, ...query };
    await this.itemService.existsItem(item);

    const prices = await this.priceService.getTradePrices(options);
    return prices.map(PriceTradeResponseDto.of);
  }

  @Get('/trade/:type/:id/recent')
  @ApiOperation({ summary: '최신 거래 가격 조회' })
  async getRecentTradePrice(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto> {
    const options = { ...item, ...query };
    await this.itemService.existsItem(item);

    const price = await this.priceService.getRecentTradePrice(options);
    return PriceTradeResponseDto.of(price);
  }
}
