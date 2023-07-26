import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal, DealRaw, DealFiltered } from 'src/entities';
import { FindOptionsPage } from 'src/lib/types/page.type';
import { addDays } from 'src/lib/utils/date.util';
import { getTypeName } from 'src/lib/utils/type.util';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly dealFilteredRepository: DealFilteredRepository,
    @InjectRepository(DealRaw)
    private readonly dealRawRepository: Repository<DealRaw>,
  ) {}

  getOptions(type: string, model: number): FindOptionsWhere<DealFiltered> {
    return type ? { type, item: { [getTypeName(type)]: { model } } } : {};
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

  async getDealRaw(id: number): Promise<DealRaw> {
    return this.dealRawRepository.findOneOrFail({
      where: { id, classified: false },
    });
  }

  async classifyDealRaw(id: number): Promise<void> {
    await this.dealRawRepository.update({ id }, { classified: true });
  }

  async createDeal(id: number, payload: Partial<Deal>): Promise<void> {
    const dealRaw = await this.getDealRaw(id);
    const { price, source, url, date, imgUrl, type, itemId, unused } = dealRaw;

    const image = await fetch(`${imgUrl}?type=w300`)
      .then((res) => res.arrayBuffer().then(Buffer.from))
      .catch((e) => {
        console.log(e);
        return null;
      });

    const deal = {
      type,
      itemId,
      unused,
      ...payload,
      price,
      source,
      sold: false,
      url,
      date,
      image,
    };

    await this.dealRepository.create(deal).save();
  }
}
