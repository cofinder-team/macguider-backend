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
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import {
  DealRawRequestDto,
  DealRawResponseDto,
  DealReportRequestDto,
  DealRequestDto,
  DealResponseDto,
} from 'src/dtos';
import { paginate } from 'src/lib/utils/pagination.util';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { firstValueFrom, map } from 'rxjs';

@Controller('deal')
export class DealController {
  constructor(
    private readonly dealService: DealService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getDeals(@Query() query: DealRequestDto): Promise<DealResponseDto[]> {
    const { type, model, sort, direction, ...pagination } = query;

    const options = this.dealService.getOptions(type, model);
    const order = this.dealService.getOrder(sort, direction);
    const page = paginate(pagination);

    const deals = await this.dealService.getDealsByOptions(
      options,
      order,
      page,
    );

    return deals.map(DealResponseDto.of);
  }

  @Get('/:id')
  async getDeal(@Param('id') id: number): Promise<DealResponseDto> {
    const deal = await this.dealService.getDeal(id);
    return DealResponseDto.of(deal);
  }

  @Get('/:id/image')
  @Header('Content-Type', 'image/jpeg')
  async getDealImage(@Param('id') id: number) {
    const buffer = await this.dealService.getDealImage(id);
    const readable = Readable.from(buffer);
    return new StreamableFile(readable);
  }

  @Get('/raw/:id')
  async getDealRaw(@Param('id') id: number): Promise<DealRawResponseDto> {
    const dealRaw = await this.dealService.getDealRaw(id);
    return DealRawResponseDto.of(dealRaw);
  }

  @Put('/raw/:id')
  async convertDealFromRaw(
    @Param('id') id: number,
    @Body() body: DealRawRequestDto,
  ): Promise<void> {
    await this.dealService.getDealRaw(id);

    const { valid, ...payload } = body;
    if (valid) {
      await this.dealService.createDeal(id, payload);
    }

    await this.dealService.classifyDealRaw(id);
  }

  @Post('/:id/report')
  async reportDeal(
    @Param('id') id: number,
    @Body() body: DealReportRequestDto,
  ): Promise<AxiosResponse> {
    const url = this.configService.get('SLACK_WEBHOOK_URL');
    const { report } = body;

    const data = {
      channel: 'hotdeal-alert',
      username: 'User Report',
      text: `[Report] #${id}\n${report}\nhttps://dev.macguider.io/deals/report/${id}`,
    };

    return firstValueFrom(
      this.httpService.post(url, data).pipe(map((x) => x.data)),
    );
  }
}
