import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TradeSource } from '../lib/enums';
import { Deal } from './deal.entity';
import { DealRaw } from './deal/raw.entity';
import { Trade } from './trade.entity';

@Entity({ schema: 'macguider', name: 'source' })
@Unique('source_uk', ['source'])
export class Source {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'source_pk' })
  id: number;

  @Column()
  source: TradeSource;

  @OneToMany(() => Deal, (deal) => deal.sourceEntity)
  deals: Deal[];

  @OneToMany(() => DealRaw, (dealRaw) => dealRaw.sourceEntity)
  rawDeals: DealRaw[];

  @OneToMany(() => Trade, (trade) => trade.sourceEntity)
  trades: Trade[];
}
