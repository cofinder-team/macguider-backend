import { BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Model } from '../model.entity';
import { Item } from '../item.entity';

export class ItemDetailEntity extends BaseEntity {
  @Column()
  type: string;

  @PrimaryColumn()
  id: number;

  @Column()
  model: number;

  @Column()
  option: number;

  modelEntity: Model;

  item: Item;
}
