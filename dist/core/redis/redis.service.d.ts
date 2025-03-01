import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
export declare class RedisService extends Redis {
    private readonly configService;
    constructor(configService: ConfigService);
}
