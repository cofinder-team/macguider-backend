import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/lib/decorators/auth.user.decorator';
import { AuthUserDto, UserResponseDto } from 'src/dtos';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/auth')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAuthUser(@AuthUser() user: AuthUserDto): Promise<UserResponseDto> {
    const { id } = user;

    const result = await this.userService.getUserById(id);
    return UserResponseDto.of(result);
  }
}
