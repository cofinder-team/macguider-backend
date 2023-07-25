import { Injectable } from '@nestjs/common';
import { DealFiltered } from 'src/entities';
import { FindOptionsPage } from 'src/lib/types/page.type';
import { addDays } from 'src/lib/utils/date.util';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  MoreThanOrEqual,
} from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly dealFilteredRepository: DealFilteredRepository,
  ) {}

  private async getDeals(
    where: FindOptionsWhere<DealFiltered> | FindOptionsWhere<DealFiltered>[],
    order: FindOptionsOrder<DealFiltered>,
    pagination: FindOptionsPage,
    relations: FindOptionsRelations<DealFiltered>,
  ): Promise<DealFiltered[]> {
    return this.dealFilteredRepository.find({
      where,
      order,
      ...pagination,
      relations,
    });
  }

  async getDealsByOptions(
    options: FindOptionsWhere<DealFiltered>,
    pagination: FindOptionsPage,
  ): Promise<DealFiltered[]> {
    const where: FindOptionsWhere<DealFiltered> = {
      ...options,
      date: MoreThanOrEqual(addDays(new Date(), -3)),
    };

    const order: FindOptionsOrder<DealFiltered> = {
      discount: 'DESC',
      date: 'DESC',
    };

    const relations: FindOptionsRelations<DealFiltered> = {
      item: {
        macbook: { modelEntity: {} },
        ipad: { modelEntity: {} },
      },
    };

    return this.getDeals(where, order, pagination, relations);
  }

  async getDeal(id: number): Promise<DealFiltered> {
    return this.dealFilteredRepository.findOneOrFail({
      where: { id },
      relations: {
        item: {
          macbook: { modelEntity: {} },
          ipad: { modelEntity: {} },
        },
      },
    });
  }

  async getDealImage(id: number): Promise<Buffer> {
    const { image } = await this.dealRepository.findOneOrFail({
      where: { id },
    });

    return image;
  }
}
