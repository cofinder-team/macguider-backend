import { BaseEntity, Column } from 'typeorm';
import { Model } from '../model.entity';
import { Item } from '../item.entity';
import { ItemType } from 'src/lib/enums';

export class ItemDetailEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  id: number;

  @Column()
  model: number;

  @Column()
  option: number;

  modelEntity: Model;

  item: Item;
}
