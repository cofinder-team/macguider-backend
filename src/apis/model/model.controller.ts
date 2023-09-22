import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelService } from './model.service';
import { ItemDto, ModelDetailResponseDto, ModelRequestDto } from 'src/dtos';

@Controller('model')
@ApiTags('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  @ApiOperation({ summary: '전체 모델 목록 조회' })
  async getModels(
    @Query() payload: ModelRequestDto,
  ): Promise<ModelDetailResponseDto[]> {
    const { type } = payload;

    const options = { type };
    const models = await this.modelService.getModels(options);
    return models.map(ModelDetailResponseDto.of);
  }

  @Get('/:type/:id')
  @ApiOperation({ summary: '모델별 상세 정보 조회' })
  async getModel(@Param() params: ItemDto): Promise<ModelDetailResponseDto> {
    const { type, id } = params;
    const model = await this.modelService.getModel(type, id);
    return ModelDetailResponseDto.of(model);
  }
}
