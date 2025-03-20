import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    constructor(configService: ConfigService);
    createPayment(): Promise<any>;
    confirmPayment(dto: any): Promise<any>;
}
