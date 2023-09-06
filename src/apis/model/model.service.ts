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
    const order: FindOptionsOrder<Model> = { type: 'ASC', id: 'ASC' };
    const relations: FindOptionsRelations<Model> = {
      mainItem: { image: {} },
    };

    return this.modelRepository.find({ where, order, relations });
  }

  async getModel(type: ItemType, id: number): Promise<Model> {
    const where: FindOptionsWhere<Model> = { type, id };
    const relations: FindOptionsRelations<Model> = { mainItem: { image: {} } };

    return this.modelRepository.findOneOrFail({ where, relations });
  }
}
