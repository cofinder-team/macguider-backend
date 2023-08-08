import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { Item, PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';
import { ItemService } from '../item/item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceRegular, PriceCoupang, PriceTrade, Item]),
  ],
  controllers: [PriceController],
  providers: [PriceService, ItemService],
})
export class PriceModule {}
