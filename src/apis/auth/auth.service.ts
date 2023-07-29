import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { TokenPayloadDto } from 'src/dtos';
import { User } from 'src/entities';

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

  async verifyLogin(user: User, password: string): Promise<boolean> {
    if (!user) return false;
    const { password: hashedPassword } = user;

    return this.verifyPassword(password, hashedPassword);
  }

  async verifyToken(token: string): Promise<TokenPayloadDto | undefined> {
    return this.jwtService
      .verifyAsync(token)
      .then((decoded) =>
        decoded && decoded.id && decoded.email
          ? { id: decoded.id, email: decoded.email }
          : undefined,
      )
      .catch(() => undefined);
  }

  private signToken(payload: TokenPayloadDto, isRefresh?: boolean): string {
    const options: JwtSignOptions = isRefresh
      ? { expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') }
      : {};

    return this.jwtService.sign(payload, options);
  }

  generateAccessToken(user: User): string {
    const { id, email } = user;
    const payload: TokenPayloadDto = { id, email };
    return this.signToken(payload);
  }

  generateRefreshToken(user: User): string {
    const { id, email } = user;
    const payload: TokenPayloadDto = { id, email };
    return this.signToken(payload, true);
  }

  refreshAccessToken(token: any): string {
    const { id, email } = token;
    const payload: TokenPayloadDto = { id, email };
    return this.signToken(payload);
  }
}
