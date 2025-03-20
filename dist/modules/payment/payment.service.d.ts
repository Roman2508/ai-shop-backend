import { ConfigService } from '@nestjs/config';
import { OrderService } from '../order/order.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccountService } from '../auth/account/account.service';
export declare class PaymentService {
    private readonly orderService;
    private readonly configService;
    private readonly accountService;
    constructor(orderService: OrderService, configService: ConfigService, accountService: AccountService);
    createPayment(dto: CreatePaymentDto): Promise<any>;
    confirmPayment(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
        userId: string | null;
    }>;
}
