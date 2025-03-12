import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NlpModule } from '../modules/nlp/nlp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from 'src/shared/utils/is-dev.util';
import { FileModule } from 'src/modules/file/file.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ReviewModule } from 'src/modules/review/review.module';
import { ProductModule } from 'src/modules/product/product.module';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { SessionModule } from 'src/modules/auth/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      // isGlobal: true, // Makes the ConfigModule available globally
      // envFilePath: '.env', // Specifies the path to the .env file (optional if using the default)
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: true,
        uploads: false,
        csrfPrevention: false,
      }),
      inject: [ConfigService],
    }),

    PrismaModule,
    RedisModule,
    AccountModule,
    SessionModule,
    NlpModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    FileModule,
  ],
})
export class CoreModule {}
