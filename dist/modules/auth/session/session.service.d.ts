import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginInput } from './inputs/login.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
export declare class SessionService {
    private readonly prismaService;
    private readonly redisService;
    private readonly configService;
    constructor(prismaService: PrismaService, redisService: RedisService, configService: ConfigService);
    findByUser(req: Request): Promise<any[]>;
    findCurrent(req: Request): Promise<any>;
    login(req: Request, input: LoginInput, userAgent: string): Promise<unknown>;
    logout(req: Request): Promise<unknown>;
    clearSession(req: Request): Promise<boolean>;
    remove(req: Request, id: string): Promise<boolean>;
}
