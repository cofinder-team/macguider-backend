import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user).save();
  }

  async checkDuplicationEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !user;
  }
}
