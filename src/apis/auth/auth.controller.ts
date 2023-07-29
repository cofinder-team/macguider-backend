import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  AuthLoginRequestDto,
  AuthRegisterRequestDto,
  AuthTokenResponseDto,
  UserResponseDto,
} from 'src/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(
    @Body() payload: AuthLoginRequestDto,
  ): Promise<AuthTokenResponseDto> {
    const { email, password } = payload;

    const user = await this.userService.getUserByEmail(email);
    const isVerified = await this.authService.verifyLogin(user, password);
    if (!isVerified) {
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const accessToken = this.authService.generateAccessToken(user);
    const refreshToken = this.authService.generateRefreshToken(user);

    /* TODO: save refresh token */

    return { accessToken, refreshToken };
  }

  @Post('/register')
  async register(
    @Body() body: AuthRegisterRequestDto,
  ): Promise<UserResponseDto> {
    const { email, password } = body;
    const hashedPassword = await this.authService.hashPassword(password);

    const isDuplicated = await this.userService.checkDuplicationEmail(email);
    if (!isDuplicated) {
      throw new BadRequestException('이미 서비스에 가입된 이메일입니다.');
    }

    /* TODO: send email verification */

    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    return UserResponseDto.of(user);
  }
}
