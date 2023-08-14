import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Put,
  Post,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import {
  DealManageRequestDto,
  DealRawConvertRequestDto,
  DealRawResponseDto,
  DealFilteredResponseDto,
  DealReportRequestDto,
  DealRequestDto,
  DealResponseDto,
} from 'src/dtos';
import { paginate } from 'src/lib/utils/pagination.util';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { EntityNotFoundError } from 'typeorm';
import { Deal } from 'src/entities';
import { PriceService } from '../price/price.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { RoleGuard } from '../auth/jwt/role.guard';
import { Role } from 'src/lib/enums/user.role.enum';
import { SlackService } from './slack/slack.service';

@Controller('deal')
@ApiTags('deal')
export class DealController {
  constructor(
    private readonly dealService: DealService,
    private readonly priceService: PriceService,
    private readonly slackService: SlackService,
  ) {}

  @Get()
  @ApiOperation({ summary: '핫딜 조건에 해당하는 거래 목록 조회' })
  async getDeals(
    @Query() query: DealRequestDto,
  ): Promise<DealFilteredResponseDto[]> {
    const { type, model, itemId, source, sort, direction, ...pagination } =
      query;

    const options = this.dealService.getOptions(type, model, itemId, source);
    const order = this.dealService.getOrder(sort, direction);
    const page = paginate(pagination);

    const deals = await this.dealService.getDealsByOptions(
      options,
      order,
      page,
    );

    return deals.map(DealFilteredResponseDto.of);
  }

  @Get('/:id')
  @ApiOperation({ summary: '거래 상세 정보 조회 (가격 정보 포함)' })
  async getDeal(@Param('id') id: number): Promise<DealResponseDto> {
    const deal = await this.dealService.getDeal(id);
    const { type, itemId } = deal;

    const item = { type, id: itemId };
    const regularPrice = await this.priceService.getRecentRegularPrice(item);
    const coupangPrice = await this.priceService.getRecentCoupangPrice(item);
    const tradePrice = await this.priceService.getRecentTradePrice(item);

    return DealResponseDto.of(
      Object.assign(deal, {
        regularPrice,
        coupangPrice,
        tradePrice,
      }),
    );
  }

  @Get('/:id/image')
  @ApiOperation({ summary: '거래 이미지 조회' })
  @Header('Content-Type', 'image/jpeg')
  async getDealImage(@Param('id') id: number) {
    const buffer = await this.dealService.getDealImage(id);
    const readable = Readable.from(buffer);
    return new StreamableFile(readable);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({
    summary: '거래 정보 수정 및 삭제 (Admin Console [Manage] 전용)',
  })
  @ApiBearerAuth()
  async manageDeal(
    @Param('id') id: number,
    @Body() body: DealManageRequestDto,
  ): Promise<void> {
    await this.dealService.getDeal(id);

    const { remove, ...payload } = body;

    const { affected } = await (remove
      ? this.dealService.deleteDeal(id)
      : this.dealService.updateDeal(id, payload));

    if (!affected) throw new EntityNotFoundError(Deal, id);
  }

  @Get('/raw/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({
    summary: '수집된 raw 거래 정보 확인 (Admin Console [Raw] 전용)',
  })
  @ApiBearerAuth()
  async getDealRaw(@Param('id') id: number): Promise<DealRawResponseDto> {
    const dealRaw = await this.dealService.getDealRaw(id);
    return DealRawResponseDto.of(dealRaw);
  }

  @Put('/raw/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({
    summary: '수집된 raw 정보를 거래 내역에 등록 (Admin Console [Raw] 전용)',
  })
  @ApiBearerAuth()
  async convertDealFromRaw(
    @Param('id') id: number,
    @Body() body: DealRawConvertRequestDto,
  ): Promise<void> {
    await this.dealService.getDealRaw(id);

    const { valid, ...payload } = body;
    if (valid) {
      await this.dealService.createDeal(id, payload);
    }

    await this.dealService.classifyDealRaw(id);
  }

  @Post('/:id/report')
  @ApiOperation({ summary: '거래 신고 및 Slack 알림 전송' })
  async reportDeal(
    @Param('id') id: number,
    @Body() body: DealReportRequestDto,
  ): Promise<AxiosResponse> {
    const { report } = body;

    return this.slackService.sendSlackReport(id, report);
  }
}
