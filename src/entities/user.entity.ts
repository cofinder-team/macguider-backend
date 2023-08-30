import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AlertTarget } from './alert/target.entity';
import { Role } from 'src/lib/enums';

@Entity({ schema: 'macguider', name: 'user' })
@Unique('user_email_uk', ['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'user_pk' })
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  certified: boolean;

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  alertTargets: AlertTarget[];
}
