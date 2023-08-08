import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { AuthUser } from 'src/lib/decorators/auth.user.decorator';
import { TokenPayloadDto } from 'src/dtos';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AlertCreateRequestDto,
  AlertRemoveRequestDto,
  AlertResponseDto,
} from 'src/dtos';
import { randomUuid } from 'src/lib/utils/uuid.util';
import { ItemService } from '../item/item.service';

@Controller('alert')
@ApiTags('alert')
export class AlertController {
  constructor(
    private readonly alertService: AlertService,
    private readonly itemService: ItemService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사용자의 알림 대상인 옵션 목록 조회' })
  @ApiBearerAuth()
  async getAlerts(
    @AuthUser() user: TokenPayloadDto,
  ): Promise<AlertResponseDto[]> {
    const { id: userId } = user;
    const alerts = await this.alertService.getAlertsByUser(userId);

    return alerts.map(AlertResponseDto.of);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사용자의 알림 대상으로 옵션 추가' })
  @ApiBearerAuth()
  async createAlert(
    @AuthUser() user: TokenPayloadDto,
    @Body() body: AlertCreateRequestDto,
  ): Promise<AlertResponseDto> {
    const { id: userId } = user;
    const { type, id: itemId, unused } = body;

    await this.itemService.existsItem({ type, id: itemId });

    if (this.alertService.getAlertByOption({ type, itemId, unused, userId })) {
      throw new BadRequestException('이미 알림 대상으로 추가된 정보입니다.');
    }

    const alert = { type, itemId, unused, userId, uuid: randomUuid() };

    const result = await this.alertService.createAlert(alert);
    return AlertResponseDto.of(result);
  }

  @Delete('/:uuid')
  @ApiOperation({ summary: '특정 알림 삭제' })
  async removeAlert(@Param() { uuid }: AlertRemoveRequestDto): Promise<void> {
    await this.alertService.existsAlertByUuid(uuid);

    await this.alertService.removeAlertByUuid(uuid);
  }
}
