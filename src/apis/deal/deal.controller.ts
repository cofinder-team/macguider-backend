import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Put,
  Post,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { DealService } from './deal.service';
import {
  DealManageRequestDto,
  DealRawConvertRequestDto,
  DealRawResponseDto,
  DealFilteredResponseDto,
  DealReportRequestDto,
  DealRequestDto,
  DealResponseDto,
  DealRawCreateRequestDto,
  DealStateRequestDto,
  DealCreateRequestDto,
  DealUpdateRequestDto,
  DealRemoveRequestDto,
} from 'src/dtos';
import { paginate } from 'src/lib/utils/pagination.util';
import { EntityNotFoundError } from 'typeorm';
import { Deal } from 'src/entities';
import { PriceService } from '../price/price.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from 'src/lib/enums';
import { SlackService } from './slack/slack.service';
import { TradeSource } from 'src/lib/enums';
import { Response } from 'express';
import { IpGuard } from '../auth/guard/ip.guard';
import { ImageService } from '../image/image.service';

@Controller('deal')
@ApiTags('deal')
export class DealController {
  constructor(
    private readonly dealService: DealService,
    private readonly priceService: PriceService,
    private readonly imageService: ImageService,
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

    const deals = await this.dealService.getDealsFilteredByOptions(
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
  @Header('Cache-Control', 'no-cache')
  async getDealImage(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    const buffer = await this.dealService.getDealImage(id);
    response.send(buffer);
  }

  @Post()
  @UseGuards(IpGuard)
  @ApiOperation({ summary: '수집된 거래 정보 등록 (Whitelisted IP 전용)' })
  async createDeal(
    @Query() state: DealStateRequestDto,
    @Body() body: DealCreateRequestDto,
  ): Promise<void> {
    const { pending } = state;
    const { imageUrl, ...info } = body;

    const payload = { ...info, pending };
    const { id } = await this.dealService.createDeal(payload);

    // TODO: replace logic with image server
    const interImage = { url: `https://macguider.io/deal/${id}/image` };
    const { id: imageId } = await this.imageService.createImage(interImage);

    const image = await this.dealService.fetchImage(imageUrl);
    await this.dealService.updateDeal(id, { imageId, image });

    if (pending) {
      await this.slackService.sendSlackPending(id);
    }
  }

  @Put('/:id')
  @UseGuards(IpGuard)
  @ApiOperation({ summary: '거래 정보 새 글로 갱신 (Whitelisted IP 전용)' })
  @ApiBearerAuth()
  async updateDeal(
    @Param('id') id: number,
    @Body() body: DealUpdateRequestDto,
  ): Promise<void> {
    await this.dealService.getDeal(id);

    const { imageUrl, ...info } = body;

    // TODO: replace logic with image server
    const interImage = { url: `https://macguider.io/deal/${id}/image` };
    const { id: imageId } = await this.imageService.createImage(interImage);

    const image = await this.dealService.fetchImage(imageUrl);
    const payload = { ...info, imageId, image };

    const { affected } = await this.dealService.updateDeal(id, payload);
    if (!affected) throw new EntityNotFoundError(Deal, id);
  }

  @Delete('/:id')
  @UseGuards(IpGuard)
  @ApiOperation({
    summary: '거래 정보 판매 완료 처리 및 삭제 (Whitelisted IP 전용)',
  })
  @ApiBearerAuth()
  async removeDeal(
    @Param('id') id: number,
    @Query() query: DealRemoveRequestDto,
  ): Promise<void> {
    await this.dealService.getDeal(id);

    const { sold } = query;
    const payload = { sold };

    const { affected } = sold
      ? await this.dealService.updateDeal(id, payload)
      : await this.dealService.deleteDeal(id);
    if (!affected) throw new EntityNotFoundError(Deal, id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({ summary: '거래 정보 매뉴얼하게 관리 (Admin Console 전용)' })
  @ApiBearerAuth()
  async manageDeal(
    @Param('id') id: number,
    @Body() body: DealManageRequestDto,
  ): Promise<void> {
    await this.dealService.getDeal(id);

    const { remove, ...data } = body;
    const payload = { ...data, pending: false };

    const { affected } = remove
      ? await this.dealService.deleteDeal(id)
      : await this.dealService.updateDeal(id, payload);
    if (!affected) throw new EntityNotFoundError(Deal, id);
  }

  @Post('/raw')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({
    deprecated: true,
    summary: '수집된 raw 거래 정보 등록 (Mobile Crawler 전용)',
  })
  @ApiBearerAuth()
  async createDealRaw(@Body() body: DealRawCreateRequestDto): Promise<void> {
    const { url } = body;
    const deal = await this.dealService.getDealRawByUrl(url);

    const result = await (async () => {
      if (deal) {
        const { id, url } = deal;
        return { id, url, success: false };
      } else {
        const payload = { url, source: TradeSource.당근마켓 };
        const { id } = await this.dealService.createDealRaw(payload);
        return { id, url, success: true };
      }
    })();

    await this.slackService.sendSlackDealRaw(result);
  }

  @Get('/raw/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
  @ApiOperation({
    deprecated: true,
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
    deprecated: true,
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
      await this.dealService.createDealFromRaw(id, payload);
    }

    await this.dealService.classifyDealRaw(id);
  }

  @Post('/:id/report')
  @ApiOperation({ summary: '거래 신고 및 Slack 알림 전송' })
  async reportDeal(
    @Param('id') id: number,
    @Body() body: DealReportRequestDto,
  ): Promise<void> {
    const { report } = body;

    await this.slackService.sendSlackReport(id, report);
  }
}
