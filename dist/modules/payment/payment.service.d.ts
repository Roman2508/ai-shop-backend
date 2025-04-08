import { ConfigService } from '@nestjs/config';
import { OrderService } from '../order/order.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccountService } from '../auth/account/account.service';
import { FondyCallbackResponseDto } from './dto/fondy-callback-response.dto';
export declare class PaymentService {
    private readonly orderService;
    private readonly configService;
    private readonly accountService;
    constructor(orderService: OrderService, configService: ConfigService, accountService: AccountService);
    createPayment(dto: CreatePaymentDto): Promise<any>;
    checkSignature(dto: FondyCallbackResponseDto): boolean;
    confirmPayment(dto: FondyCallbackResponseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    }>;
}
