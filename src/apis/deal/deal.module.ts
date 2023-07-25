import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { DealRaw } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([DealRepository, DealFilteredRepository, DealRaw]),
  ],
  controllers: [DealController],
  providers: [DealService, DealRepository, DealFilteredRepository],
})
export class DealModule {}
