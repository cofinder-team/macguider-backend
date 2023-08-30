import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Item } from '../item.entity';
import { Model } from '../model.entity';
import { Chip, Ssd } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'item_macbook' })
export class ItemMacbook extends ItemDetailEntity {
  @Column({ type: 'enum', enum: Chip })
  chip: Chip;

  @Column()
  cpu: number;

  @Column()
  gpu: number;

  @Column()
  ram: number;

  @Column({ type: 'enum', enum: Ssd })
  ssd: Ssd;

  @ManyToOne(() => Model, (model) => model.macbookItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.macbook)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
