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
  @ApiOperation({ summary: '최근 1년간 정가 정보 조회' })
  async getRegularPrices(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto[]> {
    const options = { ...item };

    const prices = await this.itemService.getRegularPrices(options);
    return prices.map(PriceRegularResponseDto.of);
  }

  @Get('/regular/:type/:id/recent')
  @ApiOperation({ summary: '최신 정품 가격 조회' })
  async getRecentRegularPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const options = { ...item };

    const price = await this.itemService.getRecentRegularPrice(options);
    return PriceRegularResponseDto.of(price);
  }

  @Get('/coupang/:type/:id')
  @ApiOperation({ summary: '최근 1년간 정품 가격 조회' })
  async getCoupangPrices(
    @Param() item: ItemDto,
  ): Promise<PriceCoupangResponseDto[]> {
    const options = { ...item };

    const prices = await this.itemService.getCoupangPrices(options);
    return prices.map(PriceCoupangResponseDto.of);
  }

  @Get('/coupang/:type/:id/recent')
  @ApiOperation({ summary: '최신 쿠팡 가격 조회' })
  async getRecentCoupangPrice(
    @Param() item: ItemDto,
  ): Promise<PriceRegularResponseDto> {
    const options = { ...item };

    const price = await this.itemService.getRecentCoupangPrice(options);
    return PriceCoupangResponseDto.of(price);
  }

  @Get('/trade/:type/:id')
  @ApiOperation({ summary: '최근 1년간 거래 가격 조회' })
  async getTradePrices(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto[]> {
    const options = { ...item, ...query };

    const prices = await this.itemService.getTradePrices(options);
    return prices.map(PriceTradeResponseDto.of);
  }

  @Get('/trade/:type/:id/recent')
  @ApiOperation({ summary: '최신 거래 가격 조회' })
  async getRecentTradePrice(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto> {
    const options = { ...item, ...query };

    const price = await this.itemService.getRecentTradePrice(options);
    return PriceTradeResponseDto.of(price);
  }

  @Get('/deal/:type/:id')
  @ApiOperation({
    summary: '임시 거래 가격 조회 (deprecated)',
    deprecated: true,
  })
  async getPrice(
    @Param() item: ItemDto,
    @Query() query: PriceTradeRequestDto,
  ): Promise<PriceTradeResponseDto> {
    const options = { ...item, ...query };

    const price = await this.itemService.getRecentTradePrice(options);
    return PriceTradeResponseDto.of(price);
  }
}
