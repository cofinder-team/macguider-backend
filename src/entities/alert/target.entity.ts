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
import { Item } from '../item.entity';
import { ItemType } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'alert_target' })
@Unique('alert_target_uk', ['unused', 'type', 'userId', 'itemId'])
export class AlertTarget extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
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
    { name: 'type', referencedColumnName: 'type' },
    { name: 'item_id', referencedColumnName: 'id' },
  ])
  item: Item;

  @ManyToOne(() => User, (user) => user.alertTargets)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
