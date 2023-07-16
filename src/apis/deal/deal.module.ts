import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealRepository } from 'src/repositories';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';

@Module({
  imports: [TypeOrmModule.forFeature([DealRepository])],
  controllers: [DealController],
  providers: [DealService, DealRepository],
})
export class DealModule {}
