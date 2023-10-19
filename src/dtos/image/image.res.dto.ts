import { Image } from 'src/entities';
import { getExtensionByImageType } from 'src/lib/enums/image.type.enum';

export class ImageResponseDto {
  url: string;

  static of(image: Image): ImageResponseDto {
    const { key, type } = image;
    const url = `${key}.${getExtensionByImageType(type)}`;
    return { url };
  }
}
