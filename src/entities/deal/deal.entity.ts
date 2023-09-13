import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Item } from '../item/item.entity';
import { ItemCondition, ItemType, TradeSource } from 'src/lib/enums';
import { Source } from '../source.entity';
import { Image } from '../image.entity';

@Entity({ schema: 'macguider', name: 'deal' })
@Unique('deal_image_uk', ['imageId'])
export class Deal extends BaseEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'deal_pk' })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  @Column()
  itemId: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  price: number;

  @Column({ default: false })
  sold: boolean;

  @Column({ default: false })
  unused: boolean;

  @Column()
  source: TradeSource;

  @Column()
  url: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({ nullable: true })
  imageId: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  lastCrawled: Date;

  @Column({ nullable: true })
  writer: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  appleCare: boolean;

  @Column({ type: 'enum', enum: ItemCondition, nullable: true })
  condition: ItemCondition;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  alertedAt: Date;

  @Column({ default: false })
  pending: boolean;

  @ManyToOne(() => Item, (item) => item.deals)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'deal_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'deal_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;

  @ManyToOne(() => Source, (source) => source.deals)
  @JoinColumn({
    foreignKeyConstraintName: 'deal_source_source_fk',
    name: 'source',
    referencedColumnName: 'source',
  })
  sourceEntity: Source;

  @OneToOne(() => Image, (image) => image.deal, { nullable: true })
  @JoinColumn({
    foreignKeyConstraintName: 'deal_image_id_fk',
    name: 'image_id',
    referencedColumnName: 'id',
  })
  imageEntity: Image;
}
