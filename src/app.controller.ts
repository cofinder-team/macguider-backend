import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async main(): Promise<void> {
    return;
  }
}
