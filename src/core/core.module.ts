import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from 'src/shared/util/is-dev.util';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphglConfig } from './config/graphql';
import { LangchainModule } from 'src/langchain/langchain.module';
import { RedisModule } from './redis/redis.module';
import { AccountModule } from 'src/modules/auth/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      // isGlobal: true, // Makes the ConfigModule available globally
      // envFilePath: '.env', // Specifies the path to the .env file (optional if using the default)
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'username',
    //   password: 'password',
    //   database: 'testdb',
    //   // entities: users, products,
    //   entities: [],
    //   synchronize: true,
    // }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphglConfig,
      inject: [ConfigService],
    }),
    LangchainModule,
    PrismaModule,
    RedisModule,
    AccountModule,
  ],
})
export class CoreModule {}
