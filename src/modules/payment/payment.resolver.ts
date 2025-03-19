import { PaymentService } from './payment.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization } from 'src/shared/decorators/auth.decorator';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { PaymentResponseModel } from './model/payment-response.model';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  // @Authorization()
  // @Mutation(() => Boolean, { name: 'deleteProduct' })
  // async delete(@Args('productId') productId: string) {
  // return this.prismaService.delete(productId);
  // }

  @Mutation(() => PaymentResponseModel, { name: 'createFondyPayment' })
  createPayment() {
    // createPayment(@Args('input') input: CreatePaymentInput) {
    return this.paymentService.createPayment();
  }

  @Mutation(() => Boolean, { name: 'confirmFondyPayment' })
  async confirmPayment() {
    return this.paymentService.confirmPayment('dto');
  }
}
