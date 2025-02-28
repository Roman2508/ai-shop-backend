import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginInput } from './inputs/login.input';
import { Request } from 'express';
export declare class SessionService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    login(req: Request, input: LoginInput): Promise<unknown>;
    logout(req: Request): Promise<unknown>;
}
