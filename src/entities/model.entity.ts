import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Type } from './type.entity';
import { ItemMacbook } from './item/macbook.entity';
import { ItemIpad } from './item/ipad.entity';
import { ItemIphone } from './item/iphone.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'model' })
export class Model {
  @PrimaryColumn({
    primaryKeyConstraintName: 'model_pk',
    type: 'varchar',
    length: 1,
  })
  type: ItemType;

  @PrimaryColumn({ primaryKeyConstraintName: 'model_pk' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ItemMacbook, (macbookItem) => macbookItem.modelEntity)
  macbookItems: ItemMacbook[];

  @OneToMany(() => ItemIpad, (ipadItem) => ipadItem.modelEntity)
  ipadItems: ItemIpad[];

  @OneToMany(() => ItemIphone, (iphoneItem) => iphoneItem.modelEntity)
  iphoneItems: ItemIphone[];

  @ManyToOne(() => Type, (type) => type.models)
  @JoinColumn({
    foreignKeyConstraintName: 'model_type_type_fk',
    name: 'type',
    referencedColumnName: 'type',
  })
  typeEntity: Type;
}
