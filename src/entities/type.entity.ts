import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Model } from './model/model.entity';
import { Item } from './item/item.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'type' })
export class Type extends BaseEntity {
  @PrimaryColumn({
    primaryKeyConstraintName: 'type_pk',
    type: 'varchar',
    length: 1,
  })
  type: ItemType;

  @Column()
  tblName: string;

  @OneToMany(() => Model, (model) => model.typeEntity)
  models: Model[];

  @OneToMany(() => Item, (item) => item.typeEntity)
  items: Item[];
}
