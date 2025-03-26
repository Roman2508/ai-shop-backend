import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { CartItemModel } from './cart-item.model';
import { EnumUserRoles, User } from 'prisma/generated';
import { FavoriteItemModel } from './favorite-item.model';
import { OrderModel } from 'src/modules/order/models/order.model';
import { ReviewModel } from 'src/modules/review/models/review.model';

registerEnumType(EnumUserRoles, {
  name: 'EnumUserRoles',
});

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

  @Field(() => EnumUserRoles)
  role: EnumUserRoles;

  @Field(() => [FavoriteItemModel])
  favorites: FavoriteItemModel[];

  @Field(() => [CartItemModel])
  cart: CartItemModel[];

  @Field(() => [OrderModel])
  orders: OrderModel[];

  @Field(() => [ReviewModel])
  reviews: ReviewModel[];

  @Field(() => [String])
  viewedProducts: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
