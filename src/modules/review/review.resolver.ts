import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ReviewService } from './review.service';
import { ReviewModel } from './models/review.model';
import { CreateReviewInput } from './inputs/create-review.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';

@Resolver('Review')
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Authorization()
  @Query(() => [ReviewModel], { name: 'getReviewByUserId' })
  async getByUserId(@Authorized('id') userId: string) {
    return this.reviewService.getByUserId(userId);
  }

  @Query(() => Number, { name: 'getAverageRating' })
  async getAverage() {
    return this.reviewService.getAverage();
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'createReview' })
  async create(@Authorized('id') userId: string, @Args('data') input: CreateReviewInput) {
    return this.reviewService.create(userId, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteReview' })
  async delete(@Authorized('id') userId: string, @Args('id') id: string) {
    return this.reviewService.delete(userId, id);
  }
}
