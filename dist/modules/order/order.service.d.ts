import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(input: CreateOrderInput): Promise<{
        orderId: string;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    }>;
    checkIsExist(orderId: string): Promise<boolean>;
    updateStatus(): Promise<boolean>;
}
