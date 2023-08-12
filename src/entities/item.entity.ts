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

@Entity({ schema: 'macguider', name: 'item' })
export class Item extends BaseEntity {
  @PrimaryColumn()
  type: string;

  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Type, (type) => type.items)
  @JoinColumn({ name: 'type', referencedColumnName: 'type' })
  typeEntity: Type;

  @OneToOne(() => ItemMacbook, (itemMacbook) => itemMacbook.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  macbook: ItemMacbook;

  @OneToOne(() => ItemIpad, (ItemIpad) => ItemIpad.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  ipad: ItemIpad;

  @OneToOne(() => ItemIphone, (ItemIphone) => ItemIphone.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  iphone: ItemIphone;

  @OneToMany(() => Deal, (deal) => deal.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  deals: Deal[];

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  alertTargets: AlertTarget[];
}
