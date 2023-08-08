import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AuthUser } from 'src/lib/decorators/auth.user.decorator';
import { TokenPayloadDto } from 'src/dtos';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlertCreateRequestDto, AlertResponseDto } from 'src/dtos/alert';

@Controller('alert')
@ApiTags('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사용자의 알림 대상 옵션 추가' })
  @ApiBearerAuth()
  async createAlert(
    @AuthUser() user: TokenPayloadDto,
    @Body() body: AlertCreateRequestDto,
  ): Promise<AlertResponseDto> {
    const { id: userId } = user;
    const { type, id: itemId, unused } = body;

    const alert = { type, itemId, unused, userId };
    const result = await this.alertService.createAlert(alert);
    return AlertResponseDto.of(result);
  }
}
