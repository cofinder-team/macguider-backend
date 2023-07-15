import { Injectable } from '@nestjs/common';
import { Deal } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DealRepository extends Repository<Deal> {
  constructor(private dataSource: DataSource) {
    super(Deal, dataSource.createEntityManager());
  }
}
