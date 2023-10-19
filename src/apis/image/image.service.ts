import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageS3RequestDto } from 'src/dtos';
import { Image } from 'src/entities';
import { ImageType, parseImageType } from 'src/lib/enums/image.type.enum';
import { randomUuid } from 'src/lib/utils/uuid.util';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async fetchImage(url: string): Promise<ImageS3RequestDto> {
    const response: Response = await fetch(url);

    const key = randomUuid();
    const type: ImageType = await response
      .clone()
      .blob()
      .then((blob) => parseImageType(blob.type));
    const buffer: Buffer = await response
      .clone()
      .arrayBuffer()
      .then(Buffer.from);

    return { key, type, buffer };
  }

  async createImage(payload: Partial<Image>): Promise<Image> {
    return this.imageRepository.save(payload);
  }
}
