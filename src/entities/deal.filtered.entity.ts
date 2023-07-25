import { Column, ViewEntity } from 'typeorm';
import { Deal } from './deal.entity';

@ViewEntity({ schema: 'macguider', name: 'deal_filtered' })
export class DealFiltered extends Deal {
  @Column()
  average: number;

  @Column({ type: 'numeric' })
  discount: number;
}
