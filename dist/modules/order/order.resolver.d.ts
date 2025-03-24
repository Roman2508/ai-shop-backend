import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createPayment(input: CreateOrderInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    }>;
    updateStatus(): Promise<boolean>;
}
