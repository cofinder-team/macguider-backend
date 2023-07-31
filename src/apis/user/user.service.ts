import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user).save();
  }

  async checkDuplicationEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !user;
  }

  async updateUserToken(id: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(id, { refreshToken });
  }
}
