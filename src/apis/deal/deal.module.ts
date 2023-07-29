import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealFilteredRepository, DealRepository } from 'src/repositories';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([DealRepository, DealFilteredRepository]),
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [DealController],
  providers: [DealService, DealRepository, DealFilteredRepository],
})
export class DealModule {}
