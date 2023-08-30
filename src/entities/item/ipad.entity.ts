import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Item } from '../item.entity';
import { Model } from '../model.entity';
import { Storage, Chip } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item_ipad' })
@Unique('item_ipad_option_uk', ['model', 'option'])
@Unique('item_ipad_detail_uk', ['model', 'storage', 'gen', 'cellular'])
export class ItemIpad extends ItemDetailEntity {
  @Column({ type: 'enum', enum: Storage })
  storage: Storage;

  @Column()
  gen: number;

  @Column()
  cellular: boolean;

  @Column({ type: 'enum', enum: Chip, enumName: 'chip_enum', nullable: true })
  chip: Chip;

  @ManyToOne(() => Model, (model) => model.ipadItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.ipad)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
