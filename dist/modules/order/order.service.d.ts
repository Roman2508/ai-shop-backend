import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(input: CreateOrderInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
        userId: string | null;
    }>;
    checkIsExist(orderId: string): Promise<boolean>;
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
