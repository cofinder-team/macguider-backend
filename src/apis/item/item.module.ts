import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from '../item/item.service';
import { ItemRepository } from 'src/repositories';
import { ItemController } from './item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
