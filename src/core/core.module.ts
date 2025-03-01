import { graphqlUploadExpress } from 'graphql-upload';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NlpModule } from '../modules/nlp/nlp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisModule } from './redis/redis.module';
import { getGraphglConfig } from './config/graphql.config';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from 'src/shared/util/is-dev.util';
import { ProductModule } from 'src/modules/product/product.module';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { join } from 'path';
import { ReviewModule } from 'src/modules/review/review.module';
import { OrderModule } from 'src/modules/order/order.module';
import { FileModule } from 'src/modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      // isGlobal: true, // Makes the ConfigModule available globally
      // envFilePath: '.env', // Specifies the path to the .env file (optional if using the default)
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphglConfig,
      inject: [ConfigService],
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
export class CoreModule {
  configure(consumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('*');
  }
}
