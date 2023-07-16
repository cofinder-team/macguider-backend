import { Injectable } from '@nestjs/common';
import { Item } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ItemRepository extends Repository<Item> {
  constructor(private dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }
}
