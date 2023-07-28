import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto, ItemResponseDto } from 'src/dtos';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getItems(): Promise<ItemResponseDto[]> {
    const items = await this.itemService.getItems();
    return items.map(ItemResponseDto.of);
  }

  @Get('/:type/:id')
  async getItem(@Param() params: ItemDto): Promise<ItemResponseDto> {
    const { type, id } = params;
    const item = await this.itemService.getItem(type, id);
    return ItemResponseDto.of(item);
  }
}
