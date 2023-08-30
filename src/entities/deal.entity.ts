import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { ItemCondition, ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'deal' })
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
  source: string;

  @Column()
  url: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

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
}
