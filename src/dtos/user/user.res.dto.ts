import { User } from 'src/entities';

export class UserResponseDto {
  id: number;
  email: string;
  role: string;

  static of(user: User): UserResponseDto {
    const { id, email, role } = user;
    return { id, email, role };
  }
}
