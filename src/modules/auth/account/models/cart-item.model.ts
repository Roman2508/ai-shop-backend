import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserModel } from './user.model';
import { CartItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';

@ObjectType()
export class CartItemModel implements CartItem {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  count: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  userId: string;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => String)
  productId: string;
}
