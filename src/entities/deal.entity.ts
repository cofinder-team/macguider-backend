import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'macguider', name: 'deal' })
export class Deal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column()
  date: Date;

  @Column()
  price?: number;

  @Column()
  sold: boolean;

  @Column()
  unopened: boolean;

  @Column()
  source: string;

  @Column()
  url: string;

  @Column({ type: 'bytea' })
  image: Buffer;
}
