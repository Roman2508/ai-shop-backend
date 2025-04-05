import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(input: CreateOrderInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    }>;
    checkIsExist(orderId: string): Promise<boolean>;
    getAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            username: string;
            displayName: string;
            avatar: string | null;
            city: string | null;
            street: string | null;
            postOffice: string | null;
            role: import("prisma/generated").$Enums.EnumUserRoles;
            viewedProducts: string[];
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderId: string;
        status: import("prisma/generated").$Enums.EnumOrderStatus;
        total: number;
    })[]>;
}
