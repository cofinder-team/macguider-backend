import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { ItemDetail } from './item.detall';
import { Item } from './item.entity';
import { Model } from '../model/model.entity';
import { Storage, Chip, ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item_ipad' })
@Unique('item_ipad_option_uk', ['model', 'option'])
@Unique('item_ipad_detail_uk', ['model', 'storage', 'gen', 'cellular'])
export class ItemIpad extends BaseEntity implements ItemDetail {
  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  @PrimaryColumn({ primaryKeyConstraintName: 'item_ipad_pk' })
  id: number;

  @Column()
  model: number;

  @Column()
  option: number;

  @Column({ type: 'enum', enum: Storage })
  storage: Storage;

  @Column()
  gen: number;

  @Column()
  cellular: boolean;

  @Column({ type: 'enum', enum: Chip, nullable: true })
  chip: Chip;

  @Column({ nullable: true })
  year: number;

  @Column({ type: 'date', nullable: true })
  releasedAt: Date;

  @Column({ type: 'varchar', array: true, default: '{}' })
  colors: string[];

  @ManyToOne(() => Model, (model) => model.ipadItems)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'item_ipad_model_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'item_ipad_model_type_id_fk',
      name: 'model',
      referencedColumnName: 'id',
    },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.ipad)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'item_ipad_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'item_ipad_item_type_id_fk',
      name: 'id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;
}
