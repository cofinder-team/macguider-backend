import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from '../item/item.service';
import { ItemIpad, ItemMacbook } from 'src/entities';
import { ItemRepository } from 'src/repositories';
import { ItemController } from './item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, ItemMacbook, ItemIpad])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}