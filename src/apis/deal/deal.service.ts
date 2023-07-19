import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal, DealRaw } from 'src/entities';
import { DealRepository } from 'src/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    private readonly dealrepository: DealRepository,
    @InjectRepository(DealRaw)
    private readonly dealRawRepository: Repository<DealRaw>,
  ) {}

  async getDeals(): Promise<Deal[]> {
    return this.dealrepository.find({
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

    await this.dealrepository.create(deal).save();
  }
}
