import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthRegisterRequestDto, UserResponseDto } from 'src/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
