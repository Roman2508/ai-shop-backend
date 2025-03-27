import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createPayment(input: CreateOrderInput): Promise<{
        orderId: string;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    }>;
    updateStatus(): Promise<boolean>;
}
