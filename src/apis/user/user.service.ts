import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user).save();
  }
}
