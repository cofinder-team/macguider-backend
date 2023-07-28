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

@Entity({ schema: 'macguider', name: 'deal' })
export class Deal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  price?: number;

  @Column()
  sold: boolean;

  @Column()
  unused: boolean;

  @Column()
  source: string;

  @Column()
  url: string;

  @Column({ type: 'bytea' })
  image: Buffer;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Item, (item) => item.deals)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'item_id', referencedColumnName: 'id' },
  ])
  item: Item;
}
