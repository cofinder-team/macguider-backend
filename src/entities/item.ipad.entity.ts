import { Column, Entity } from 'typeorm';
import { ItemDetailEntity } from './item.detall.entity';

@Entity({ schema: 'macguider', name: 'item_ipad' })
export class ItemIpad extends ItemDetailEntity {
  @Column()
  gen: number;

  @Column()
  storage: number;

  @Column()
  cellular: boolean;
}
