import { Controller } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageService: ImageService,
  ) {}
}
