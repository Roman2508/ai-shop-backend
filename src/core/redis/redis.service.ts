import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService extends Redis {
  constructor(private readonly configService: ConfigService) {
    super(configService.getOrThrow<string>('REDIS_URI'));
  }
}
