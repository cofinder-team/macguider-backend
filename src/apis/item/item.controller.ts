import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto, ItemResponseDto } from 'src/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:type/:id')
  @ApiOperation({ summary: '옵션별 상세 정보 조회' })
  async getItem(@Param() params: ItemDto): Promise<ItemResponseDto> {
    const { type, id } = params;
    const item = await this.itemService.getItem(type, id);
    return ItemResponseDto.of(item);
  }
}
