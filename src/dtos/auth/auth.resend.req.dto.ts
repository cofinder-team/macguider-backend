import { IsEmail, IsString } from 'class-validator';

export class AuthResendRequestDto {
  @IsString()
  @IsEmail()
  email: string;
}
