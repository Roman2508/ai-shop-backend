import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createPayment(input: CreateOrderInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
        userId: string | null;
    }>;
    getAll(): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            username: string;
            password: string;
            displayName: string;
            avatar: string | null;
            city: string | null;
            street: string | null;
            postOffice: string | null;
            role: import("prisma/generated").$Enums.EnumUserRoles;
            viewedProducts: string[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
        userId: string | null;
    })[]>;
}
