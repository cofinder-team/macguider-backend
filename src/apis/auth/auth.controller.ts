import { Body, Controller, Post } from '@nestjs/common';
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

    /* TODO: duplicate email check */

    /* TODO: send email verification */

    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    return UserResponseDto.of(user);
  }
}
