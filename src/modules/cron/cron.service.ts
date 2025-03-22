import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(public readonly prismaService: PrismaService) {}

  //   @Cron('*/60 * * * * *')
  //   @Cron('0 0 * * *')
  @Cron('0 * * * *')
  async changeOrderStatus() {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    // oneMinuteAgo.setDate(oneMinuteAgo.getDate() - 1);

    const orders = await this.prismaService.order.findMany({
      where: {
        status: 'PAYED',
      },
    });

    await this.prismaService.order.updateMany({
      where: {
        status: 'PAYED',
        createdAt: {
          lte: oneHourAgo,
        },
      },
      data: {
        status: 'DELIVERED',
      },
    });

    console.log('orders:', orders);
  }
}
