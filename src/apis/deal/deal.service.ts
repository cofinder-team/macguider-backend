import { Injectable } from '@nestjs/common';
import { Deal } from 'src/entities';
import { DealRepository } from 'src/repositories';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class DealService {
  constructor(private readonly dealrepository: DealRepository) {}

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
}
