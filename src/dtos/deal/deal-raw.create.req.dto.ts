import { IsUrl } from 'class-validator';

export class DealRawCreateRequestDto {
  @IsUrl()
  url: string;
}
