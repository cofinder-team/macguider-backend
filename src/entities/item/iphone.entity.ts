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
import { Model } from '../model.entity';
import { Item } from '../item.entity';
import { Storage, IphoneSuffix } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item_iphone' })
@Unique('item_iphone_option_uk', ['model', 'option'])
@Unique('item_iphone_detail_uk', ['model', 'modelSuffix', 'storage'])
export class ItemIphone extends ItemDetailEntity {
  @PrimaryColumn({ primaryKeyConstraintName: 'item_iphone_pk' })
  id: number;

  @Column({ type: 'enum', enum: IphoneSuffix })
  modelSuffix: IphoneSuffix;

  @Column({ type: 'enum', enum: Storage })
  storage: Storage;

  @ManyToOne(() => Model, (model) => model.iphoneItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.iphone)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
