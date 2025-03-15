import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { OrderItemModel } from './order-item.model';
import { EnumOrderStatus, Order } from 'prisma/generated';
import { UserModel } from 'src/modules/auth/account/models/user.model';

registerEnumType(EnumOrderStatus, {
  name: 'EnumOrderStatus',
});

@ObjectType()
export class OrderModel implements Order {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => EnumOrderStatus)
  status: EnumOrderStatus;

  @Field(() => [OrderItemModel])
  items: OrderItemModel[];

  @Field(() => Number)
  total: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  userId: string;
}
