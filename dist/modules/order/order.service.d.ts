import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createPayment(input: CreateOrderInput, userId: string): Promise<boolean>;
    updateStatus(): Promise<boolean>;
}
