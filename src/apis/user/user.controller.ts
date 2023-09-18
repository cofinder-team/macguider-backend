import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/lib/decorators/auth.user.decorator';
import {
  AuthUserDto,
  SubscriptionDirectRequestDto,
  SubscriptionUserRequestDto,
  UserResponseDto,
} from 'src/dtos';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { SlackService } from '../slack/slack.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly slackService: SlackService,
  ) {}

  @Get('/auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '현재 로그인 사용자 정보 조회' })
  @ApiBearerAuth()
  async getAuthUser(@AuthUser() user: AuthUserDto): Promise<UserResponseDto> {
    const { id } = user;

    const result = await this.userService.getUserById(id);
    return UserResponseDto.of(result);
  }

  @Post('/subscribe')
  @ApiOperation({ summary: '직접 작성된 뉴스레터 구독 처리' })
  async processSubscriptionDirect(
    @Body() body: SubscriptionDirectRequestDto,
  ): Promise<void> {
    const { email } = body;

    await this.slackService.sendSlackSubscription(email);
  }
}
