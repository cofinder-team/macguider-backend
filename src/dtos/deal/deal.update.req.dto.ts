import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class DealUpdateRequestDto {
  @IsBoolean()
  sold: boolean;

  @IsDateString()
  date: Date;

  @IsNumber()
  price: number;

  @IsUrl()
  url: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUrl()
  imageUrl: string;
}
