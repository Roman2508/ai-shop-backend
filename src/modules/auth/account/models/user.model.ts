import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from 'prisma/generated';
import { CartItemModel } from './cart-item.model';
import { FavoriteItemModel } from './favorite-item.model';
import { OrderModel } from 'src/modules/order/models/order.model';
import { ReviewModel } from 'src/modules/review/models/review.model';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => String, { nullable: true })
  postOffice: string;

  @Field(() => [FavoriteItemModel])
  favorites: FavoriteItemModel[];

  @Field(() => [CartItemModel])
  cart: CartItemModel[];

  @Field(() => [OrderModel])
  orders: OrderModel[];

  @Field(() => [ReviewModel])
  reviews: ReviewModel[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
