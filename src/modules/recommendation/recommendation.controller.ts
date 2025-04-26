import { Get, Post, Body, Controller } from '@nestjs/common';

import { RecommendationService } from './recommendation.service';
import { CreateVectorInput } from './inputs/create.vector.input';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post('/create')
  createProduct(@Body() dto: CreateVectorInput) {
    return this.recommendationService.createProductVector(dto);
  }

  @Get('/find')
  findSimilarProducts(@Body() dto: any[]) {
    return this.recommendationService.findSimilarProducts(dto);
  }
}
