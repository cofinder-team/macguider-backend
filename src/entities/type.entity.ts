import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Model } from './model.entity';
import { Item } from './item.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'type' })
export class Type extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 1 })
  type: ItemType;

  @Column()
  tblName: string;

  @OneToMany(() => Model, (model) => model.typeEntity)
  @JoinColumn({ name: 'type', referencedColumnName: 'type' })
  models: Model[];

  @OneToMany(() => Item, (item) => item.typeEntity)
  @JoinColumn({ name: 'type', referencedColumnName: 'type' })
  items: Item[];
}
