import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

export class ItemDetailEntity extends BaseEntity {
  @Column()
  type: string;

  @PrimaryColumn()
  id: number;

  @Column()
  model: number;

  @Column()
  option: number;
}
