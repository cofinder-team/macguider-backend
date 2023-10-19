import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { Deal, DealFiltered, DealRaw, User, Image } from 'src/entities';
import { PriceService } from '../price/price.service';
import { PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';
import { SlackModule } from '../slack/slack.module';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from '../image/image.service';
import { S3Module } from '../image/s3/s3.module';

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
      Image,
    ]),
    ConfigModule,
    S3Module,
    SlackModule,
  ],
  controllers: [DealController],
  providers: [DealService, PriceService, ImageService],
})
export class DealModule {}
