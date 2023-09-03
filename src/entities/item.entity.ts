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
import { DealRaw } from './deal/raw.entity';
import { Type } from './type.entity';
import { ItemMacbook } from './item/macbook.entity';
import { ItemIpad } from './item/ipad.entity';
import { AlertTarget } from './alert/target.entity';
import { ItemIphone } from './item/iphone.entity';
import { ItemType } from 'src/lib/enums';
import { Vendor } from './vendor.entity';
import { LogRegular } from './log/regular.entity';
import { LogCoupang } from './log/coupang.entity';
import { Trade } from './trade.entity';
import { PriceRegular } from './price/regular.entity';
import { PriceCoupang } from './price/coupang.entity';
import { PriceTrade } from './price/trade.entity';

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

  @OneToMany(() => DealRaw, (dealRaw) => dealRaw.sourceEntity)
  rawDeals: DealRaw[];

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.item)
  alertTargets: AlertTarget[];

  @OneToMany(() => Vendor, (vendor) => vendor.item)
  vendors: Vendor[];

  @OneToMany(() => LogRegular, (logRegular) => logRegular.item)
  regularLogs: LogRegular[];

  @OneToMany(() => LogCoupang, (logCoupang) => logCoupang.item)
  coupangLogs: LogCoupang[];

  @OneToMany(() => Trade, (trade) => trade.item)
  trades: Trade[];

  @OneToMany(() => PriceRegular, (priceRegular) => priceRegular.item)
  regularPrices: PriceRegular[];

  @OneToMany(() => PriceCoupang, (priceCoupang) => priceCoupang.item)
  coupangPrices: PriceCoupang[];

  @OneToMany(() => PriceTrade, (priceTrade) => priceTrade.item)
  tradePrices: PriceTrade[];
}
