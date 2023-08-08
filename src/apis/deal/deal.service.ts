import { Injectable } from '@nestjs/common';
import { Deal, DealFiltered } from 'src/entities';
import { FindOptionsPage } from 'src/lib/types/page.type';
import { addDays } from 'src/lib/utils/date.util';
import { getTypeName } from 'src/lib/utils/type.util';
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

  getOptions(
    type: string,
    model: number,
    itemId: number,
    source: string,
  ): FindOptionsWhere<DealFiltered> {
    const options = type
      ? { type, itemId, item: { [getTypeName(type)]: { model } } }
      : {};

    return {
      ...options,
      source,
    };
  }

  getOrder(sort: string, direction: string): FindOptionsOrder<DealFiltered> {
    return ['date', 'discount'].includes(sort)
      ? { [sort]: direction === 'desc' ? 'DESC' : 'ASC' }
      : { discount: 'DESC' };
  }

  private async getDeals(
    where: FindOptionsWhere<DealFiltered> | FindOptionsWhere<DealFiltered>[],
    order: FindOptionsOrder<DealFiltered>,
    page: FindOptionsPage,
    relations: FindOptionsRelations<DealFiltered>,
  ): Promise<DealFiltered[]> {
    return this.dealFilteredRepository.find({
      where,
      order,
      ...page,
      relations,
    });
  }

  async getDealsByOptions(
    options: FindOptionsWhere<DealFiltered>,
    order: FindOptionsOrder<DealFiltered>,
    page: FindOptionsPage,
  ): Promise<DealFiltered[]> {
    const where: FindOptionsWhere<DealFiltered> = {
      ...options,
      date: MoreThanOrEqual(addDays(new Date(), -3)),
    };

    const relations: FindOptionsRelations<DealFiltered> = {
      item: {
        macbook: { modelEntity: {} },
        ipad: { modelEntity: {} },
      },
    };

    return this.getDeals(where, order, page, relations);
  }

  async getDeal(id: number): Promise<Deal> {
    return this.dealRepository.findOneOrFail({
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
