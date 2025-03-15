import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Review } from 'prisma/generated';

@ObjectType()
export class ReviewModel implements Review {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => Number)
  rating: number;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
