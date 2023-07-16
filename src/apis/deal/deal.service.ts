import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal, DealRaw } from 'src/entities';
import { DealRepository } from 'src/repositories';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    private readonly dealrepository: DealRepository,
    @InjectRepository(DealRaw)
    private readonly dealRawRepository: Repository<DealRaw>,
  ) {}

  async getDeals(): Promise<Deal[]> {
    const utcHour: number = new Date().getUTCHours();
    const timeOption: FindOptionsWhere<Deal> =
      utcHour >= 2 && utcHour < 6 ? {} : { sold: true };

    return this.dealrepository.find({
      where: { ...timeOption },
      order: { date: 'DESC' },
    });
  }

  async getDealImage(id: number): Promise<Buffer> {
    const { image } = await this.dealrepository.findOneOrFail({
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
    const { price, source, url, date, image, type, itemId, unused } = dealRaw;

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

    await this.dealrepository.create(deal).save();
  }
}
