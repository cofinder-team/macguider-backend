import { Image } from 'src/entities';

export class ImageResponseDto {
  url: string;

  static of(image: Image): ImageResponseDto {
    const { url } = image;
    return { url };
  }
}
