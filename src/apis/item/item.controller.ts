import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto, ItemRequestDto, ItemResponseDto } from 'src/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOperation({ summary: '전체 품목 및 옵션 목록 조회' })
  async getItems(@Query() payload: ItemRequestDto): Promise<ItemResponseDto[]> {
    const { type, model, ...details } = payload;

    const options = this.itemService.getOptions(type, model, details);
    const items = await this.itemService.getItems(options);
    return items.map(ItemResponseDto.of);
  }

  @Get('/:type/:id')
  @ApiOperation({ summary: '옵션별 상세 정보 조회' })
  async getItem(@Param() params: ItemDto): Promise<ItemResponseDto> {
    const { type, id } = params;
    const item = await this.itemService.getItem(type, id);
    return ItemResponseDto.of(item);
  }
}
