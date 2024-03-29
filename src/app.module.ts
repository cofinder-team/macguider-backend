import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerMiddleware } from './lib/middlewares/logger.middleware';
import { validateEnvironment } from './lib/utils/env.validate';
import { DealModule } from './apis/deal/deal.module';
import { ItemModule } from './apis/item/item.module';
import { PriceModule } from './apis/price/price.module';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';
import { AlertModule } from './apis/alert/alert.module';
import { ModelModule } from './apis/model/model.module';
import { ImageModule } from './apis/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      validate: validateEnvironment,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: config.get<string>('NODE_ENV') === 'dev',
      }),
    }),
    AuthModule,
    UserModule,
    DealModule,
    ItemModule,
    ModelModule,
    PriceModule,
    AlertModule,
    ImageModule,
    TerminusModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
