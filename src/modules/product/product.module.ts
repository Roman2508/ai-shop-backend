import { Module } from '@nestjs/common';

import { NlpModule } from '../nlp/nlp.module';
import { FileModule } from '../file/file.module';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
  imports: [NlpModule, FileModule, RecommendationModule],
})
export class ProductModule {}
