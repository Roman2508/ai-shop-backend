import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Authorization()
  @Mutation(() => Boolean, { name: 'createPayment' })
  async createPayment(@Authorized('id') userId: string, @Args('data') input: CreateOrderInput) {
    return this.orderService.createPayment(input, userId);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateStatus' })
  async updateStatus() {
    return this.orderService.updateStatus();
  }
}
