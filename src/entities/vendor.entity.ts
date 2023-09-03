import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Item } from './item.entity';

@Entity({ schema: 'macguider', name: 'vendor' })
@Unique('vendor_vendor_uk', ['product', 'vendor'])
export class Vendor {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'vendor_pk' })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: string;

  @Column()
  item_id: number;

  @Column({ type: 'bigint' })
  product: number;

  @Column({ type: 'bigint' })
  vendor: number;

  @ManyToOne(() => Item, (item) => item.vendors)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'vendor_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'vendor_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;
}
