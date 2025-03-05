import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [ReviewResolver, ReviewService],
  imports: [ProductModule],
})
export class ReviewModule {}
