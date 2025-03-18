import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Review } from 'prisma/generated';
import { UserModel } from 'src/modules/auth/account/models/user.model';
import { ProductModel } from 'src/modules/product/models/product.model';

@ObjectType()
export class ReviewModel implements Review {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => Number)
  rating: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  userId: string;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => String)
  productId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
