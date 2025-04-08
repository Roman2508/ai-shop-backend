import { Response } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FondyCallbackResponseDto } from './dto/fondy-callback-response.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    paymentHandler(dto: CreatePaymentDto): Promise<any>;
    paymentConfirmation(dto: FondyCallbackResponseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
        userId: string | null;
    }>;
    testCookie(res: Response): void;
}
