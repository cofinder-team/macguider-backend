import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { DealRaw } from 'src/entities';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PriceService } from '../price/price.service';
import { PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PriceRegular,
      PriceCoupang,
      PriceTrade,
      DealRepository,
      DealFilteredRepository,
      DealRaw,
    ]),
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [DealController],
  providers: [
    DealService,
    PriceService,
    DealRepository,
    DealFilteredRepository,
  ],
})
export class DealModule {}
