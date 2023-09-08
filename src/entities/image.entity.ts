import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item/item.entity';
import { Deal } from './deal/deal.entity';

@Entity({ schema: 'macguider', name: 'image' })
export class Image {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'image_pk' })
  id: number;

  @Column()
  url: string;

  @OneToMany(() => Item, (item) => item.image)
  items: Item[];

  @OneToOne(() => Deal, (deal) => deal.image)
  deal: Deal;
}
