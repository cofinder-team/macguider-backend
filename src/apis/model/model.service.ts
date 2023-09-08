import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/entities';
import { ItemType } from 'src/lib/enums';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async getModels(options: FindOptionsWhere<Model>): Promise<Model[]> {
    const where: FindOptionsWhere<Model> = { ...options };
    const order: FindOptionsOrder<Model> = {
      type: 'ASC',
      id: 'ASC',
      histories: { date: 'DESC' },
    };
    const relations: FindOptionsRelations<Model> = {
      mainItem: { image: {} },
      histories: {},
    };

    return this.modelRepository.find({ where, order, relations });
  }

  async getModel(type: ItemType, id: number): Promise<Model> {
    const where: FindOptionsWhere<Model> = { type, id };
    const order: FindOptionsOrder<Model> = {
      histories: { date: 'DESC' },
    };
    const relations: FindOptionsRelations<Model> = {
      mainItem: { image: {} },
      histories: {},
    };

    return this.modelRepository.findOneOrFail({ where, order, relations });
  }
}
