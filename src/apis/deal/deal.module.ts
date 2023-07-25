import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';

@Module({
  imports: [TypeOrmModule.forFeature([DealRepository, DealFilteredRepository])],
  controllers: [DealController],
  providers: [DealService, DealRepository, DealFilteredRepository],
})
export class DealModule {}
