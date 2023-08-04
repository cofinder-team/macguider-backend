import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  AuthCertificateRequestDto,
  AuthLoginRequestDto,
  AuthRefreshRequestDto,
  AuthRegisterRequestDto,
  AuthTokenResponseDto,
  TokenPayloadDto,
  UserResponseDto,
} from 'src/dtos';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';
import { AuthUser } from 'src/lib/decorators/auth.user.decorator';
import { MailService } from './mail/mail.service';
import { v4 as randomUuid } from 'uuid';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
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

    const hashedRefreshToken = await this.authService.hash(refreshToken);
    await this.userService.updateUserToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  @Post('/refresh')
  async refresh(
    @Body() payload: AuthRefreshRequestDto,
  ): Promise<AuthTokenResponseDto> {
    const { refreshToken } = payload;

    const decodedToken = await this.authService.decodeToken(refreshToken);
    if (!decodedToken) {
      throw new BadRequestException('유효하지 않은 정보입니다.');
    }

    const { id } = decodedToken;
    const user = await this.userService.getUserById(id);
    const isVerified = await this.authService.verifyToken(user, refreshToken);
    if (!isVerified) {
      throw new UnauthorizedException('인증되지 않은 정보입니다.');
    }

    const accessToken = this.authService.refreshAccessToken(decodedToken);
    return { accessToken, refreshToken };
  }

  @Post('/register')
  async register(
    @Body() body: AuthRegisterRequestDto,
  ): Promise<UserResponseDto> {
    const { email, password } = body;
    const hashedPassword = await this.authService.hash(password);

    const isDuplicated = await this.userService.checkDuplicationEmail(email);
    if (!isDuplicated) {
      throw new BadRequestException('이미 서비스에 가입된 이메일입니다.');
    }

    const uuid = randomUuid();
    const user = await this.userService.createUser({
      email,
      uuid: randomUuid(),
      password: hashedPassword,
    });

    await this.mailService.sendCertificateMail(email, uuid);
    return UserResponseDto.of(user);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async logout(@AuthUser() user: TokenPayloadDto): Promise<void> {
    const { id } = user;
    await this.userService.updateUserToken(id, null);
  }

  @Post('/certificate')
  async certificate(@Body() payload: AuthCertificateRequestDto): Promise<void> {
    const { uuid } = payload;

    const user = await this.userService.getUserByUuid(uuid);
    if (!user) {
      throw new BadRequestException('유효하지 않은 정보입니다.');
    }

    const { id } = user;
    await this.userService.certifyUser(id);
  }
}
