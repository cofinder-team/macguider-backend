import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item/item.entity';
import { Deal } from './deal/deal.entity';
import { ImageType } from 'src/lib/enums/image.type.enum';

@Entity({ schema: 'macguider', name: 'image' })
export class Image {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'image_pk' })
  id: number;

  // will be deprecated
  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true, type: 'uuid' })
  key: string;

  @Column({ nullable: true, type: 'enum', enum: ImageType })
  type: ImageType;

  @OneToMany(() => Item, (item) => item.image)
  items: Item[];

  @OneToOne(() => Deal, (deal) => deal.image)
  deal: Deal;
}
