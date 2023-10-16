import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ImageS3RequestDto } from 'src/dtos';
import { getExtensionByImageType } from 'src/lib/enums/image.type.enum';

@Injectable()
export class S3Service {
  constructor(
    @Inject('S3_CLIENT')
    private readonly s3Client: S3Client,
    @Inject('S3_BUCKET')
    private readonly s3Bucket: string,
  ) {}

  async uploadS3Image(
    image: ImageS3RequestDto,
  ): Promise<PutObjectCommandOutput> {
    const { key, type, buffer } = image;
    const extension: string = getExtensionByImageType(type);

    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: `${key}.${extension}`,
      Body: buffer,
      ContentType: type,
    });

    return this.s3Client.send(command);
  }
}
