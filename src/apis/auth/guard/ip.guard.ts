import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { getClientIp } from 'src/lib/utils/ip.util';

@Injectable()
export class IpGuard implements CanActivate {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const request: Request = ctx.switchToHttp().getRequest();

    const ip = getClientIp(request);
    const allowed = this.configService.get<string>('ADMIN_ALLOW_IP');

    return ip === allowed;
  }
}
