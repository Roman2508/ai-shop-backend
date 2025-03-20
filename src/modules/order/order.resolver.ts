import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { OrderService } from './order.service';
import { OrderModel } from './models/order.model';
import { CreateOrderInput } from './inputs/create-order.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderModel, { name: 'createOrder' })
  async createPayment(@Args('data') input: CreateOrderInput) {
    return this.orderService.create(input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateStatus' })
  async updateStatus() {
    return this.orderService.updateStatus();
  }
}
