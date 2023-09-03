import { ItemType } from 'src/lib/enums';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../item.entity';

@Entity({ schema: 'macguider', name: 'log_coupang' })
@Index('log_coupang_type_item_id_index', ['type', 'itemId'])
export class LogCoupang extends BaseEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'log_coupang_pk' })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  @Column()
  itemId: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => Item, (item) => item.coupangLogs)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'log_coupang_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'log_coupang_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;
}
