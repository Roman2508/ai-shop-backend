import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
export declare const getGraphglConfig: (configService: ConfigService) => ApolloDriverConfig;
