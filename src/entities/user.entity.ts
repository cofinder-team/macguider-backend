import { Role } from 'src/lib/types/role.type';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertTarget } from './alert-target.entity';

@Entity({ schema: 'macguider', name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  role: Role;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  certified: boolean;

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  alertTargets: AlertTarget[];
}
