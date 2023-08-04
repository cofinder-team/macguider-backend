import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { PriceCoupang, PriceRegular, PriceTrade } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PriceRegular, PriceCoupang, PriceTrade])],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
