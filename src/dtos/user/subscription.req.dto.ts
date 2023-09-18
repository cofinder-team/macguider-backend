import { IsEmail } from 'class-validator';

export class SubscriptionDirectRequestDto {
  @IsEmail()
  email: string;
}
