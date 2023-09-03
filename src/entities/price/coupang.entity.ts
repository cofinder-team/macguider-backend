import {
  BaseEntity,
  DataSource,
  JoinColumn,
  ManyToOne,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { LogCoupang } from '../log/coupang.entity';
import { Item } from '../item.entity';
import { DQuery } from '../dquery.entity';

@ViewEntity({
  schema: 'macguider',
  name: 'price_coupang',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('r.type')
      .addSelect('r.id')
      .addSelect('r.date')
      .addSelect('r.price')
      .addSelect('r.log')
      .from(
        (qb) =>
          qb
            .select('c.type', 'type')
            .addSelect('c.id', 'id')
            .addSelect('c.date::date', 'date')
            .addSelect('t.date', 'log')
            .addSelect('t.price', 'price')
            .addSelect(
              'dense_rank() OVER (PARTITION BY c.type, c.id, (c.date::date) ORDER BY t.date DESC)',
              'drank',
            )
            .from(
              (qb) =>
                qb
                  .select('i.type', 'type')
                  .addSelect('i.id', 'id')
                  .addSelect('d.date', 'date')
                  .from(Item, 'i')
                  .addFrom(DQuery, 'd'),
              'c',
            )
            .leftJoin(
              LogCoupang,
              't',
              "t.type::text = c.type::text AND t.item_id = c.id AND t.date >= c.date AND t.date < (c.date + '1 day'::interval)",
            )
            .orderBy('t.date', 'DESC'),
        'r',
      )
      .where('r.drank <= 1'),
})
export class PriceCoupang extends BaseEntity {
  @ViewColumn()
  type: string;

  @ViewColumn()
  id: number;

  @ViewColumn()
  date: Date;

  @ViewColumn()
  price: number;

  @ViewColumn()
  log: Date;

  @ManyToOne(() => Item, (item) => item.coupangPrices)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
