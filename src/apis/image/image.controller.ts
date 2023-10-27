import { Express } from 'express';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InterceptFile } from 'src/lib/decorators/file.decorator';
import { ImageS3RequestDto } from 'src/dtos/image/image.s3.req.dto';
import { randomUuid } from 'src/lib/utils/uuid.util';
import { ImageType, parseImageType } from 'src/lib/enums/image.type.enum';
import { ImageService } from './image.service';

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @ApiOperation({ summary: '이미지 업로드' })
  @InterceptFile('file')
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const { mimetype, buffer } = file;

    const key: string = randomUuid();
    const type: ImageType = parseImageType(mimetype);
    if (!type) {
      throw new BadRequestException('지원하지 않는 이미지 타입입니다.');
    }

    const image: ImageS3RequestDto = {
      key,
      type,
      buffer,
    };

    await this.s3Service.uploadS3Image(image);
    await this.imageService.createImage({ key, type });
  }
}
