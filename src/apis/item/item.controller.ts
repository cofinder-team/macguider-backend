import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto, ItemResponseDto } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:type/:id')
  async getItem(@Param() params: ItemDto): Promise<ItemResponseDto> {
    const { type, id } = params;
    const item = await this.itemService.getItem(type, id);
    return ItemResponseDto.of(item);
  }
}
