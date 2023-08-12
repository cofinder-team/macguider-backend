import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertTarget } from 'src/entities';
import { getItemDetailRelation } from 'src/lib/relations/item.detail.relation';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(AlertTarget)
    private readonly alertTargetRepository: Repository<AlertTarget>,
  ) {}

  async getAlertsByUser(userId: number): Promise<AlertTarget[]> {
    const where: FindOptionsWhere<AlertTarget> = { userId };
    const order: FindOptionsOrder<AlertTarget> = {
      type: 'ASC',
      itemId: 'ASC',
      unused: 'ASC',
    };
    const relations: FindOptionsRelations<AlertTarget> = {
      item: getItemDetailRelation({ modelEntity: {} }),
    };

    return this.alertTargetRepository.find({ where, order, relations });
  }

  async getAlertByOptions(
    option: FindOptionsWhere<AlertTarget>,
  ): Promise<AlertTarget> {
    return this.alertTargetRepository.findOne({ where: option });
  }

  async existsAlert(
    options: FindOptionsWhere<AlertTarget>,
  ): Promise<AlertTarget> {
    return this.alertTargetRepository.findOneOrFail({ where: { ...options } });
  }

  async createAlert(alert: Partial<AlertTarget>): Promise<AlertTarget> {
    return this.alertTargetRepository.create(alert).save();
  }

  async removeAlertByOptions(
    options: FindOptionsWhere<AlertTarget>,
  ): Promise<void> {
    await this.alertTargetRepository.delete({ ...options });
  }
}
