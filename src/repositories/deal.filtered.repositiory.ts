import { Injectable } from '@nestjs/common';
import { DealFiltered } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DealFilteredRepository extends Repository<DealFiltered> {
  constructor(private datasource: DataSource) {
    super(DealFiltered, datasource.createEntityManager());
  }
}
