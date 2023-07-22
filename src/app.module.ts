import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerMiddleware } from './lib/middlewares/logger.middleware';
import { validateEnvironment } from './lib/utils/env.validate';
import { DealModule } from './apis/deal/deal.module';
import { ItemModule } from './apis/item/item.module';
import { PriceModule } from './apis/price/price.module';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      validate: validateEnvironment,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
    }),
    DealModule,
    ItemModule,
    PriceModule,
    TerminusModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
