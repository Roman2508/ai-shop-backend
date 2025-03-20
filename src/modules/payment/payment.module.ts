import { Module } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { OrderModule } from '../order/order.module';
import { PaymentController } from './payment.controller';
import { AccountModule } from '../auth/account/account.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [OrderModule, AccountModule],
})
export class PaymentModule {}
