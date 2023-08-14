import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'macguider', name: 'raw_used_item' })
export class DealRaw extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  content: string;

  @Column()
  price: number;

  @Column()
  source: string;

  @Column()
  date: Date;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column()
  unused: boolean;

  @Column()
  imgUrl: string;

  @Column()
  classified: boolean;
}
