import { ItemType, Source } from 'src/lib/enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'macguider', name: 'raw_used_item' })
export class DealRaw extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  writer: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  source: Source;

  @Column({ type: 'timestamptz', default: () => 'now()', nullable: true })
  date: Date;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  type: ItemType;

  @Column({ nullable: true })
  itemId: number;

  @Column({ nullable: true })
  unused: boolean;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ default: false })
  classified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  rawJson: JSON;
}
