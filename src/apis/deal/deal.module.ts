import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { Deal, DealFiltered, DealRaw, User } from 'src/entities';
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
      Deal,
      DealFiltered,
      DealRaw,
      User,
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
  providers: [DealService, PriceService],
})
export class DealModule {}
