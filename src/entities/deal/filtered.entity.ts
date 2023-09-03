import {
  DataSource,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Deal } from '../deal.entity';
import { Trade } from '../trade.entity';

@ViewEntity({
  schema: 'macguider',
  name: 'deal_filtered',
  expression: (dataSource: DataSource): SelectQueryBuilder<any> => {
    const a = dataSource
      .createQueryBuilder()
      .select('r.*')
      .addSelect(
        'round((r.average - r.price::numeric) / r.average * 100::numeric, 1)',
        'discount',
      )
      .from(
        (qb) =>
          qb
            .select('d.*')
            .addSelect(
              (qb) =>
                qb
                  .select('avg(t.price - t.care::integer * 100000)::integer')
                  .from(Trade, 't')
                  .where('t.item_id = d.item_id')
                  .andWhere('t.type::text = d.type::text')
                  .andWhere('t.unused = d.unused')
                  .andWhere("t.date >= (CURRENT_DATE - '30 days'::interval)")
                  .andWhere("t.date < (CURRENT_DATE - '1 day'::interval)")
                  .groupBy('d.id'),
              'average',
            )
            .from(Deal, 'd'),
        'r',
      )
      .where('r.price < r.average');
    return a;
  },
})
export class DealFiltered extends Deal {
  @ViewColumn()
  average: number;

  @ViewColumn()
  discount: number;
}
