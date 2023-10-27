import { Module } from '@nestjs/common';
import { S3Module } from './s3/s3.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities';

@Module({
  imports: [S3Module, TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
