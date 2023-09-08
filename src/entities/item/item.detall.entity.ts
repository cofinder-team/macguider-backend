import { BaseEntity } from 'typeorm';
import { Model } from '../model/model.entity';
import { Item } from './item.entity';
import { ItemType } from 'src/lib/enums';

export class ItemDetailEntity extends BaseEntity {
  type: ItemType;

  id: number;

  model: number;

  option: number;

  modelEntity: Model;

  item: Item;
}
