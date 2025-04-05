import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NlpModule } from '../modules/nlp/nlp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from 'src/shared/utils/is-dev.util';
import { FileModule } from 'src/modules/file/file.module';
import { CronModule } from 'src/modules/cron/cron.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ReviewModule } from 'src/modules/review/review.module';
import { OrderModel } from 'src/modules/order/models/order.model';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ProductModule } from 'src/modules/product/product.module';
import { ReviewModel } from 'src/modules/review/models/review.model';
import { UserModel } from 'src/modules/auth/account/models/user.model';
import { ProductModel } from 'src/modules/product/models/product.model';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { CartItemModel } from 'src/modules/auth/account/models/cart-item.model';
import { RecommendationModule } from 'src/modules/recommendation/recommendation.module';
import { FavoriteItemModel } from 'src/modules/auth/account/models/favorite-item.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      // isGlobal: true, // Makes the ConfigModule available globally
      // envFilePath: '.env', // Specifies the path to the .env file (optional if using the default)
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        UserModel,
        OrderModel,
        ReviewModel,
        ProductModel,
        CartItemModel,
        FavoriteItemModel,
        //
      ],
      extra: {
        max: 1, // set pool max size
      },
      synchronize: true,
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
    PaymentModule,
    CronModule,
    RecommendationModule,
  ],
})
export class CoreModule {}
