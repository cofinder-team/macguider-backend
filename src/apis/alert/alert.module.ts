import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertTarget, Item } from 'src/entities';
import { ItemService } from '../item/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertTarget, Item])],
  controllers: [AlertController],
  providers: [AlertService, ItemService],
})
export class AlertModule {}
