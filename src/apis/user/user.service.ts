import { Injectable } from '@nestjs/common';
import { TokenPayloadDto } from 'src/dtos';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserByIdEmail(id: number, email: string): Promise<User> {
    return this.userRepository.findOne({ where: { id, email } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user).save();
  }

  async checkDuplicationEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !user;
  }

  async verifyTokenUser(token: TokenPayloadDto): Promise<boolean> {
    const { id, email } = token;
    const user = await this.getUserByIdEmail(id, email);
    return !!user;
  }
}
