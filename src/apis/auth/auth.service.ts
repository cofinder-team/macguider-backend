import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { TokenPayloadDto } from 'src/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private signToken(payload: TokenPayloadDto, isRefresh?: boolean): string {
    const options: JwtSignOptions = isRefresh
      ? { expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') }
      : {};

    return this.jwtService.sign(payload, options);
  }
}
