import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { Deal, DealFiltered, DealRaw, User } from 'src/entities';
import { PriceService } from '../price/price.service';
import { PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PriceRegular,
      PriceCoupang,
      PriceTrade,
      Deal,
      DealFiltered,
      DealRaw,
      User,
    ]),
    SlackModule,
  ],
  controllers: [DealController],
  providers: [DealService, PriceService],
})
export class DealModule {}
