import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ProductModel } from './product.model';

@ObjectType()
export class ProductsAndTotalModel {
  @Field(() => [ProductModel])
  products: ProductModel[];

  @Field(() => Int)
  total: number;
}
