import { PaymentService } from './payment.service';
export declare class PaymentResolver {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(): Promise<any>;
    confirmPayment(): Promise<any>;
}
