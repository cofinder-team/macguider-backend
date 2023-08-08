import { Controller } from '@nestjs/common';
import { AlertService } from './alert.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('alert')
@ApiTags('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}
}
