import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Deal } from './deal.entity';
import { Type } from './type.entity';
import { ItemMacbook } from './item/macbook.entity';
import { ItemIpad } from './item/ipad.entity';
import { AlertTarget } from './alert/target.entity';
import { ItemIphone } from './item/iphone.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item' })
export class Item extends BaseEntity {
  @PrimaryColumn({
    primaryKeyConstraintName: 'item_pk',
    type: 'varchar',
    length: 1,
  })
  type: ItemType;

  @PrimaryColumn({ primaryKeyConstraintName: 'item_pk' })
  id: number;

  @ManyToOne(() => Type, (type) => type.items)
  @JoinColumn({
    foreignKeyConstraintName: 'item_type_type_fk',
    name: 'type',
    referencedColumnName: 'type',
  })
  typeEntity: Type;

  @OneToOne(() => ItemMacbook, (itemMacbook) => itemMacbook.item)
  macbook: ItemMacbook;

  @OneToOne(() => ItemIpad, (itemIpad) => itemIpad.item)
  ipad: ItemIpad;

  @OneToOne(() => ItemIphone, (itemIphone) => itemIphone.item)
  iphone: ItemIphone;

  @OneToMany(() => Deal, (deal) => deal.item)
  deals: Deal[];

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.item)
  alertTargets: AlertTarget[];
}
