import { Column, Entity } from 'typeorm';
import { ItemDetailEntity } from './item.detall.entity';

@Entity({ schema: 'macguider', name: 'item_macbook' })
export class ItemMacbook extends ItemDetailEntity {
  @Column()
  chip: string;

  @Column()
  cpu: number;

  @Column()
  gpu: number;

  @Column()
  ram: number;

  @Column()
  ssd: string;
}
