import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserModel } from './user.model';
import { FavoriteItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';

@ObjectType()
export class FavoriteItemModel implements FavoriteItem {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  userId: string;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => String)
  productId: string;
}
