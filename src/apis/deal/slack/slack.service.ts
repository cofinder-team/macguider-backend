import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class SlackService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async sendSlackMessage(data: {
    channel: string;
    username: string;
    text: string;
  }): Promise<AxiosResponse> {
    const url = this.configService.get<string>('SLACK_WEBHOOK_URL');

    return firstValueFrom(
      this.httpService.post(url, data).pipe(map((x) => x.data)),
    );
  }

  async sendSlackReport(id: number, report: string): Promise<AxiosResponse> {
    const data = {
      channel: 'hotdeal-alert',
      username: 'User Report',
      text: `[Report] #${id}\n${report}\nhttps://www.macguider.io/deals/report/${id}`,
    };

    return this.sendSlackMessage(data);
  }
}
