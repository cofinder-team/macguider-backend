import {
  BaseEntity,
  DataSource,
  JoinColumn,
  ManyToOne,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Item } from '../item/item.entity';
import { DQuery } from '../dquery.entity';
import { Trade } from '../trade.entity';
import { Source } from '../source.entity';
import { TradeSource } from 'src/lib/enums';

@ViewEntity({
  schema: 'macguider',
  name: 'price_trade',
  expression: (dataSource: DataSource) => {
    const union = (
      targets: ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>)[],
    ): string => {
      const query = targets
        .map((target) => target(dataSource.createQueryBuilder()).getQuery())
        .map((query) => `(${query})`)
        .join(' UNION ');
      return `(${query})`;
    };

    return dataSource
      .createQueryBuilder()
      .select('r.type')
      .addSelect('r.id')
      .addSelect('r.unused')
      .addSelect('r.source')
      .addSelect('r.date')
      .addSelect('avg(r.price)::integer', 'average')
      .addSelect(
        'CASE WHEN count(*) > 1 THEN avg(r.price_20)::integer ELSE NULL::integer END',
        'price_20',
      )
      .addSelect(
        'CASE WHEN count(*) > 1 THEN avg(r.price_80)::integer ELSE NULL::integer END',
        'price_80',
      )
      .addSelect('count(r.price)', 'cnt')
      .from(
        (qb) =>
          qb
            .select('c.type', 'type')
            .addSelect('c.id', 'id')
            .addSelect('c.unused', 'unused')
            .addSelect('c.source', 'source')
            .addSelect('c.date::date', 'date')
            .addSelect('t.price - t.care::integer * 100000', 'price')
            .addSelect(
              'CASE WHEN percent_rank() OVER (PARTITION BY c.type, c.id, c.unused, c.date, c.source ORDER BY t.price) < 0.2 THEN t.price - t.care::integer * 100000 ELSE NULL END',
              'price_20',
            )
            .addSelect(
              'CASE WHEN percent_rank() OVER (PARTITION BY c.type, c.id, c.unused, c.date, c.source ORDER BY t.price) > 0.8 THEN t.price - t.care::integer * 100000 ELSE NULL END',
              'price_80',
            )
            .from(
              (qb) =>
                qb
                  .select('i.type', 'type')
                  .addSelect('i.id', 'id')
                  .addSelect('u.unused', 'unused')
                  .addSelect('d.date', 'date')
                  .addSelect('s.source', 'source')
                  .from(Item, 'i')
                  .addFrom(DQuery, 'd')
                  .addFrom(
                    union([
                      (qb) => qb.select('true', 'unused').fromDummy(),
                      (qb) => qb.select('false', 'unused').fromDummy(),
                    ]),
                    'u',
                  )
                  .addFrom(
                    union([
                      (qb) => qb.select('s.source', 'source').from(Source, 's'),
                      (qb) => qb.select('NULL::bpchar', 'source').fromDummy(),
                    ]),
                    's',
                  ),
              'c',
            )
            .leftJoin(
              Trade,
              't',
              "t.type::text = c.type::text AND t.item_id = c.id AND t.unused = c.unused AND t.date >= (c.date - '30 days'::interval) AND t.date < (c.date + '1 day'::interval) AND (c.source IS NULL OR t.source::bpchar = c.source)",
            )
            .orderBy('t.date', 'DESC'),
        'r',
      )
      .groupBy('r.date, r.type, r.id, r.unused, r.source');
  },
})
export class PriceTrade extends BaseEntity {
  @ViewColumn()
  type: string;

  @ViewColumn()
  id: number;

  @ViewColumn()
  unused: boolean;

  @ViewColumn()
  source: TradeSource;

  @ViewColumn()
  date: Date;

  @ViewColumn()
  average: number;

  @ViewColumn()
  price_20: number;

  @ViewColumn()
  price_80: number;

  @ViewColumn()
  cnt: number;

  @ManyToOne(() => Item, (item) => item.tradePrices)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
