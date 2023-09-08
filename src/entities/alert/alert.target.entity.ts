import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../user.entity';
import { Item } from '../item/item.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'alert_target' })
@Unique('alert_target_uk', ['unused', 'type', 'userId', 'itemId'])
export class AlertTarget extends BaseEntity {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'alert_target_pk',
    type: 'integer',
  })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: ItemType;

  @Column()
  itemId: number;

  @Column()
  unused: boolean;

  @Column()
  userId: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @ManyToOne(() => Item, (item) => item.alertTargets)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'alert_target_item_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'alert_target_item_type_id_fk',
      name: 'item_id',
      referencedColumnName: 'id',
    },
  ])
  item: Item;

  @ManyToOne(() => User, (user) => user.alertTargets)
  @JoinColumn({
    foreignKeyConstraintName: 'alert_target_user_id_fk',
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
