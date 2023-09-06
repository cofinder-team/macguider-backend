import { Image } from 'src/entities';

export class ImageResponseDto {
  id: number;
  url: string;

  static of(image: Image): ImageResponseDto {
    const { id, url } = image;
    return { id, url };
  }
}
