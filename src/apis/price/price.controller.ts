import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import {
  PriceParamRequestDto,
  PriceQueryRequestDto,
  PriceResponseDto,
} from 'src/dtos';

@Controller('price')
export class PriceController {
  constructor(private readonly itemService: PriceService) {}

  @Get('/deal/:type/:id')
  async getPrice(
    @Param() params: PriceParamRequestDto,
    @Query() query: PriceQueryRequestDto,
  ): Promise<PriceResponseDto> {
    const { type, id } = params;
    const { unused } = query;
    const price = await this.itemService.getPrice(type, id, unused);
    return PriceResponseDto.of(price);
  }
}
