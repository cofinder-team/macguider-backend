import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal, DealFiltered, DealRaw } from 'src/entities';
import { getItemDetailRelation } from 'src/lib/relations/item.detail.relation';
import { ItemType, TradeSource, getItemType } from 'src/lib/enums';
import { FindOptionsPage } from 'src/lib/types/page.type';
import { addDays } from 'src/lib/utils/date.util';
import {
  DeleteResult,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  MoreThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(DealFiltered)
    private readonly dealFilteredRepository: Repository<DealFiltered>,
    @InjectRepository(DealRaw)
    private readonly dealRawRepository: Repository<DealRaw>,
  ) {}

  getOptions(
    type: ItemType,
    model: number,
    itemId: number,
    source: TradeSource,
  ): FindOptionsWhere<DealFiltered> {
    const options = type
      ? { type, itemId, item: { [getItemType(type)]: { model } } }
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

  private defaultRelations: FindOptionsRelations<Deal> = {
    item: getItemDetailRelation({ modelEntity: {} }),
    imageEntity: {},
  };

  private async getDeals(
    where: FindOptionsWhere<Deal> | FindOptionsWhere<Deal>[],
    order: FindOptionsOrder<Deal>,
    page: FindOptionsPage,
    relations: FindOptionsRelations<Deal>,
  ): Promise<Deal[]> {
    return this.dealRepository.find({
      where,
      order,
      ...page,
      relations,
    });
  }

  private async getDealsFiltered(
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

  async getDealsOnSale(): Promise<Deal[]> {
    const where: FindOptionsWhere<Deal> = { sold: false };
    const order: FindOptionsOrder<Deal> = { id: 'ASC' };
    const page: FindOptionsPage = {};
    const relations: FindOptionsRelations<Deal> = {};

    return this.getDealsFiltered(where, order, page, relations);
  }

  async getDealsSearch(options: FindOptionsWhere<Deal>): Promise<Deal[]> {
    const where: FindOptionsWhere<Deal> = { ...options };
    const order: FindOptionsOrder<Deal> = { id: 'ASC' };
    const page: FindOptionsPage = {};
    const relations: FindOptionsRelations<Deal> = {};

    return this.getDeals(where, order, page, relations);
  }

  async getDealsFilteredByOptions(
    options: FindOptionsWhere<DealFiltered>,
    order: FindOptionsOrder<DealFiltered>,
    page: FindOptionsPage,
  ): Promise<DealFiltered[]> {
    const where: FindOptionsWhere<DealFiltered> = {
      ...options,
      date: MoreThanOrEqual(addDays(new Date(), -3)),
    };
    const relations: FindOptionsRelations<DealFiltered> = {
      ...this.defaultRelations,
    };

    return this.getDealsFiltered(where, order, page, relations);
  }

  async getDeal(id: number): Promise<Deal> {
    return this.dealRepository.findOneOrFail({
      where: { id },
      relations: this.defaultRelations,
    });
  }

  async getDealImage(id: number): Promise<Buffer> {
    const { image } = await this.dealRepository.findOneOrFail({
      where: { id },
    });

    return image;
  }

  async updateDeal(id: number, payload: Partial<Deal>): Promise<UpdateResult> {
    return this.dealRepository.update({ id }, payload);
  }

  async deleteDeal(id: number): Promise<DeleteResult> {
    return this.dealRepository.softDelete({ id });
  }

  async getDealRaw(id: number): Promise<DealRaw> {
    return this.dealRawRepository.findOneOrFail({
      where: { id, classified: false },
    });
  }

  async getDealRawByUrl(url: string): Promise<DealRaw> {
    return this.dealRawRepository.findOne({
      where: { url },
    });
  }

  async createDealRaw(payload: Partial<DealRaw>): Promise<DealRaw> {
    return this.dealRawRepository.create(payload).save();
  }

  async classifyDealRaw(id: number): Promise<void> {
    await this.dealRawRepository.update({ id }, { classified: true });
  }

  async fetchImage(url: string): Promise<Buffer> {
    return fetch(url)
      .then((res) => res.arrayBuffer().then(Buffer.from))
      .catch((e) => {
        console.log(e);
        return null;
      });
  }

  async createDeal(payload: Partial<Deal>): Promise<Deal> {
    return this.dealRepository.create(payload).save();
  }

  async createDealFromRaw(id: number, payload: Partial<Deal>): Promise<void> {
    const dealRaw = await this.getDealRaw(id);
    const {
      price,
      source,
      url,
      date,
      imgUrl,
      type,
      itemId,
      unused,
      title,
      content,
    } = dealRaw;

    const image = await this.fetchImage(`${imgUrl}?type=w300`);

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
      title,
      content,
    };

    await this.dealRepository.create(deal).save();
  }
}
