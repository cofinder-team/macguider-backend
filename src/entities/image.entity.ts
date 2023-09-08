import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item/item.entity';

@Entity({ schema: 'macguider', name: 'image' })
export class Image {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'image_pk' })
  id: number;

  @Column()
  url: string;

  @OneToMany(() => Item, (item) => item.image)
  items: Item[];
}
