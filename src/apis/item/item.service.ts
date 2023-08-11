import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/dtos';
import { Item } from 'src/entities';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async existsItem(item: ItemDto): Promise<void> {
    await this.itemRepository.findOneOrFail({ where: { ...item } });
  }

  async getItems(): Promise<Item[]> {
    const order: FindOptionsOrder<Item> = { type: 'ASC', id: 'ASC' };
    const relations: FindOptionsRelations<Item> = {
      macbook: { modelEntity: {} },
      ipad: { modelEntity: {} },
    };

    return this.itemRepository.find({ order, relations });
  }

  async getItem(type: string, id: number): Promise<Item> {
    const where: FindOptionsWhere<Item> = { type, id };
    const relations: FindOptionsRelations<Item> = {
      macbook: { modelEntity: {} },
      ipad: { modelEntity: {} },
    };

    return this.itemRepository.findOneOrFail({ where, relations });
  }
}
