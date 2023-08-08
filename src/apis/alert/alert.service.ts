import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertTarget } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(AlertTarget)
    private readonly alertTargetRepository: Repository<AlertTarget>,
  ) {}

  async createAlert(alert: Partial<AlertTarget>): Promise<AlertTarget> {
    return this.alertTargetRepository.create(alert).save();
  }
}
