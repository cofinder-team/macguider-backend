import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DealFiltered } from 'src/entities';
import { DealRepository } from 'src/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    private readonly dealRepository: DealRepository,
    @InjectRepository(DealFiltered)
    private readonly dealFilteredRepository: Repository<DealFiltered>,
  ) {}

  async getDeals(): Promise<DealFiltered[]> {
    return this.dealFilteredRepository.find({
      order: { date: 'DESC' },
    });
  }

  async getDeal(id: number): Promise<DealFiltered> {
    return this.dealFilteredRepository.findOneOrFail({ where: { id } });
  }

  async getDealImage(id: number): Promise<Buffer> {
    const { image } = await this.dealRepository.findOneOrFail({
      where: { id },
    });

    return image;
  }
}
