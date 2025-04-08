"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const nlp_module_1 = require("../modules/nlp/nlp.module");
const config_1 = require("@nestjs/config");
const apollo_1 = require("@nestjs/apollo");
const redis_module_1 = require("./redis/redis.module");
const prisma_module_1 = require("./prisma/prisma.module");
const is_dev_util_1 = require("../shared/utils/is-dev.util");
const file_module_1 = require("../modules/file/file.module");
const cron_module_1 = require("../modules/cron/cron.module");
const order_module_1 = require("../modules/order/order.module");
const review_module_1 = require("../modules/review/review.module");
const order_model_1 = require("../modules/order/models/order.model");
const payment_module_1 = require("../modules/payment/payment.module");
const product_module_1 = require("../modules/product/product.module");
const review_model_1 = require("../modules/review/models/review.model");
const user_model_1 = require("../modules/auth/account/models/user.model");
const product_model_1 = require("../modules/product/models/product.model");
const account_module_1 = require("../modules/auth/account/account.module");
const session_module_1 = require("../modules/auth/session/session.module");
const cart_item_model_1 = require("../modules/auth/account/models/cart-item.model");
const recommendation_module_1 = require("../modules/recommendation/recommendation.module");
const favorite_item_model_1 = require("../modules/auth/account/models/favorite-item.model");
const graphql_config_1 = require("./config/graphql.config");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: !is_dev_util_1.IS_DEV_ENV,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
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
                    user_model_1.UserModel,
                    order_model_1.OrderModel,
                    review_model_1.ReviewModel,
                    product_model_1.ProductModel,
                    cart_item_model_1.CartItemModel,
                    favorite_item_model_1.FavoriteItemModel,
                ],
                extra: {
                    max: 1,
                },
                synchronize: true,
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [config_1.ConfigModule],
                useFactory: graphql_config_1.getGraphglConfig,
                inject: [config_1.ConfigService]
            }),
            nlp_module_1.NlpModule,
            file_module_1.FileModule,
            cron_module_1.CronModule,
            redis_module_1.RedisModule,
            order_module_1.OrderModule,
            prisma_module_1.PrismaModule,
            review_module_1.ReviewModule,
            account_module_1.AccountModule,
            session_module_1.SessionModule,
            product_module_1.ProductModule,
            payment_module_1.PaymentModule,
            recommendation_module_1.RecommendationModule,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map