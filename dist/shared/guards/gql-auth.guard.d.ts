import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from './../../core/prisma/prisma.service';
export declare class GqlAuthGuard implements CanActivate {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
