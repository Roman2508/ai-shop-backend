import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';
import { PaymentStatusInput } from './inputs/payment-status.input';
import { EnumOrderStatus } from 'prisma/generated';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createPayment(input: CreateOrderInput, userId: string) {
    const orderItems = input.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: { connect: { id: item.productId } },
    }));

    const total = input.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await this.prismaService.order.create({
      data: {
        total,
        status: input.status,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });

    return true;
    // const payment = await checkout.createPayment({
    //   amount: {
    //     value: total.toFixed(2),
    //     currency: 'RUB',
    //   },
    //   payment_method_data: {
    //     type: 'bank_card',
    //   },
    //   confirmation: {
    //     type: 'redirect',
    //     return_url: `${process.env.CLIENT_URL}/thanks`,
    //   },
    //   description: `Оплата заказа в магазине TeaShop. Id платежи: #${order.id}`,
    // });

    // return payment;
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
