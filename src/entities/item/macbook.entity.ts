import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Item } from '../item.entity';
import { Model } from '../model.entity';
import { Chip, ItemType, Ssd } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item_macbook' })
@Unique('item_macbook_option_uk', ['model', 'option'])
@Unique('item_macbook_detail_uk', ['model', 'chip', 'cpu', 'gpu', 'ram', 'ssd'])
export class ItemMacbook extends ItemDetailEntity {
  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  @PrimaryColumn({ primaryKeyConstraintName: 'item_macbook_pk' })
  id: number;

  @Column()
  model: number;

  @Column()
  option: number;

  @Column({ type: 'enum', enum: Chip })
  chip: Chip;

  @Column()
  cpu: number;

  @Column()
  gpu: number;

  @Column()
  ram: number;

  @Column({ type: 'enum', enum: Ssd })
  ssd: Ssd;

  @ManyToOne(() => Model, (model) => model.macbookItems)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'item_macbook_model_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'item_macbook_model_type_id_fk',
      name: 'model',
      referencedColumnName: 'id',
    },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.macbook)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'item_macbook_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'item_macbook_item_type_id_fk',
      name: 'id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;
}
