import { PrismaService } from 'src/core/prisma/prisma.service';
export declare class CronService {
    readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    changeOrderStatus(): Promise<void>;
}
