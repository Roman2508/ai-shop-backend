import { Injectable } from '@nestjs/common';
import { EnumOrderStatus } from 'prisma/generated';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateOrderInput) {
    const { userId, items } = input;

    const orderItems = items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: { connect: { id: item.productId } },
    }));

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await this.prismaService.order.create({
      data: {
        total,
        status: EnumOrderStatus.PAYED,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });

    return order;
  }

  async updateStatus() {
    return true;
  }

  //   async updateStatus(input: PaymentStatusInput) {
  // if (dto.event === 'payment.waiting_for_capture') {
  //   const capturePayment = {
  //     amount: {
  //       value: dto.object.amount.value,
  //       currency: dto.object.amount.currency,
  //     },
  //   };

  //   return checkout.capturePayment(dto.object.id, capturePayment);
  // }

  // if (dto.event === 'payment.succeeded') {
  //   const orderId = dto.object.description.split('#')[1];

  //   await this.prismaService.order.update({
  //     where: {
  //       id: orderId,
  //     },
  //     data: {
  //       status: EnumOrderStatus.PAYED,
  //     },
  //   });

  //   return true;
  // }

  // return true;
  //   }
}
