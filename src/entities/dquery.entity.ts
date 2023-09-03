import {
  DataSource,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';

@ViewEntity({
  schema: 'macguider',
  name: 'dquery',
  expression: (dataSource: DataSource): SelectQueryBuilder<any> =>
    dataSource
      .createQueryBuilder()
      .select(
        "generate_series((CURRENT_DATE - 365)::timestamp with time zone, CURRENT_DATE::timestamp with time zone, '1 day'::interval)",
        'date',
      )
      .fromDummy(),
})
export class DQuery {
  @ViewColumn()
  date: Date;
}
