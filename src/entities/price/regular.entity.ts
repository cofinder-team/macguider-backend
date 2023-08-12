import { BaseEntity, Column, ViewEntity } from 'typeorm';

@ViewEntity({ schema: 'macguider', name: 'price_regular' })
export class PriceRegular extends BaseEntity {
  @Column()
  type: string;

  @Column()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  price: number;

  @Column({ type: 'timestamptz' })
  log: Date;
}
