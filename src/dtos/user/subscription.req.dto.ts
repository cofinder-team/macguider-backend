import { IsEmail, IsUUID } from 'class-validator';

export class SubscriptionDirectRequestDto {
  @IsEmail()
  email: string;
}

export class SubscriptionUserRequestDto {
  @IsUUID(4)
  uuid: string;
}
