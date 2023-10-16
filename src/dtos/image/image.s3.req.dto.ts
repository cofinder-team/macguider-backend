import { ImageType } from 'src/lib/enums/image.type.enum';

export class ImageS3RequestDto {
  key: string;
  type: ImageType;
  buffer: Buffer;
}
