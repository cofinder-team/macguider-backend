import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { PriceTradeRepository } from 'src/repositories';
import { PriceController } from './price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriceTradeRepository])],
  controllers: [PriceController],
  providers: [PriceService, PriceTradeRepository],
})
export class PriceModule {}
