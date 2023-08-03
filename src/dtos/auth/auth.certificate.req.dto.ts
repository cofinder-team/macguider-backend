import { IsUUID } from 'class-validator';

export class AuthCertificateRequestDto {
  @IsUUID(4)
  uuid: string;
}
