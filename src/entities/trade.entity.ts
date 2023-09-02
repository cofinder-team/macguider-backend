import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Source } from './source.entity';
import { TradeSource } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'trade' })
@Index('trade_type_item_id_index', ['type', 'itemId'])
export class Trade extends BaseEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'trade_pk' })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: string;

  @Column()
  itemId: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  date: Date;

  @Column()
  price: number;

  @Column({ default: false })
  unused: boolean;

  @Column({ default: false })
  care: boolean;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  source: TradeSource;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  writer: string;

  @ManyToOne(() => Item, (item) => item.trades)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'trade_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'trade_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;

  @ManyToOne(() => Source, (source) => source.trades)
  @JoinColumn({
    foreignKeyConstraintName: 'trade_source_source_fk',
    name: 'source',
    referencedColumnName: 'source',
  })
  sourceEntity: Source;
}
