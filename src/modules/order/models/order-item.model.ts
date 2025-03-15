import { Field, ID, ObjectType } from '@nestjs/graphql';

import { OrderModel } from './order.model';
import { OrderItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';

@ObjectType()
export class OrderItemModel implements OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  price: number;

  @Field(() => OrderModel)
  order: OrderModel;

  @Field(() => String)
  orderId: string;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => String)
  productId: string;
}
