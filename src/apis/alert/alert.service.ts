import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertTarget } from 'src/entities';
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
      item: { macbook: { modelEntity: {} }, ipad: { modelEntity: {} } },
    };

    return this.alertTargetRepository.find({ where, order, relations });
  }

  async getAlertByOption(
    option: FindOptionsWhere<AlertTarget>,
  ): Promise<AlertTarget> {
    return this.alertTargetRepository.findOne({ where: option });
  }

  async createAlert(alert: Partial<AlertTarget>): Promise<AlertTarget> {
    return this.alertTargetRepository.create(alert).save();
  }
}
