import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
export declare const getGraphglConfig: (configService: ConfigService) => ApolloDriverConfig;
