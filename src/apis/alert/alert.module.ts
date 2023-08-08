import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertTarget } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AlertTarget])],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
