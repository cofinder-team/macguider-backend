import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto, ItemOptionsDto } from 'src/dtos';
import { Item } from 'src/entities';
import { getItemDetailRelation } from 'src/lib/relations/item.detail.relation';
import { ItemType, getItemType } from 'src/lib/enums';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class ItemService {
  getEntityColumns: (entity: string) => string[];

  constructor(
    dataSource: DataSource,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {
    this.getEntityColumns = (entity: string) =>
      dataSource
        .getMetadata(entity)
        .columns.map((column) => column.propertyName);
  }

  async existsItem(item: ItemDto): Promise<void> {
    await this.itemRepository.findOneOrFail({ where: { ...item } });
  }

  getOptions(
    type: ItemType,
    model: number,
    details: ItemOptionsDto,
  ): FindOptionsWhere<Item> {
    const options = {
      ...(type ? { type, [getItemType(type)]: { model, ...details } } : {}),
    };

    return options;
  }

  async getItems(options: FindOptionsWhere<Item>): Promise<Item[]> {
    const where: FindOptionsWhere<Item> = { ...options };
    const order: FindOptionsOrder<Item> = { type: 'ASC', id: 'ASC' };
    const relations: FindOptionsRelations<Item> = getItemDetailRelation({
      modelEntity: {},
    });

    return this.itemRepository.find({ where, order, relations });
  }

  async getItem(type: string, id: number): Promise<Item> {
    const where: FindOptionsWhere<Item> = { type, id };
    const relations: FindOptionsRelations<Item> = getItemDetailRelation({
      modelEntity: {},
    });

    return this.itemRepository.findOneOrFail({ where, relations });
  }
}
