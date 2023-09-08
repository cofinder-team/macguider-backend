import { ItemType, TradeSource } from 'src/lib/enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Source } from '../source.entity';
import { Item } from '../item/item.entity';

@Entity({ schema: 'macguider', name: 'raw_used_item' })
@Unique('raw_used_item_url_uk', ['url', 'source'])
export class DealRaw extends BaseEntity {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'raw_used_item_pk',
    type: 'integer',
  })
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  writer: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  source: TradeSource;

  @Column({ type: 'timestamptz', default: () => 'now()', nullable: true })
  date: Date;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  type: ItemType;

  @Column({ nullable: true })
  itemId: number;

  @Column({ nullable: true })
  unused: boolean;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ default: false })
  classified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  rawJson: JSON;

  @ManyToOne(() => Item, (item) => item.rawDeals)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'raw_used_item_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'raw_used_item_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;

  @ManyToOne(() => Source, (source) => source.rawDeals)
  @JoinColumn({
    foreignKeyConstraintName: 'raw_used_item_source_source_fk',
    name: 'source',
    referencedColumnName: 'source',
  })
  sourceEntity: Source;
}
