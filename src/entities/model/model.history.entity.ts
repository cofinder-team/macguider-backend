import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';

@Entity({ schema: 'macguider', name: 'model_history' })
export class ModelHistory {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'model_history_pk' })
  id: number;

  @Column({ type: 'varchar', length: 1 })
  type: string;

  @Column()
  modelId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  info: string;

  @ManyToOne(() => Model, (model) => model.histories)
  @JoinColumn([
    {
      foreignKeyConstraintName: 'model_history_model_type_id_fk',
      name: 'type',
      referencedColumnName: 'type',
    },
    {
      foreignKeyConstraintName: 'model_history_model_type_id_fk',
      name: 'model_id',
      referencedColumnName: 'id',
    },
  ])
  model: Model;
}
