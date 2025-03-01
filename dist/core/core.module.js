"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const graphql_upload_1 = require("graphql-upload");
const common_1 = require("@nestjs/common");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const nlp_module_1 = require("../modules/nlp/nlp.module");
const config_1 = require("@nestjs/config");
const redis_module_1 = require("./redis/redis.module");
const graphql_config_1 = require("./config/graphql.config");
const prisma_module_1 = require("./prisma/prisma.module");
const is_dev_util_1 = require("../shared/util/is-dev.util");
const product_module_1 = require("../modules/product/product.module");
const account_module_1 = require("../modules/auth/account/account.module");
const session_module_1 = require("../modules/auth/session/session.module");
const review_module_1 = require("../modules/review/review.module");
const order_module_1 = require("../modules/order/order.module");
const file_module_1 = require("../modules/file/file.module");
let CoreModule = class CoreModule {
    configure(consumer) {
        consumer.apply((0, graphql_upload_1.graphqlUploadExpress)()).forRoutes('*');
    }
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: !is_dev_util_1.IS_DEV_ENV,
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [config_1.ConfigModule],
                useFactory: graphql_config_1.getGraphglConfig,
                inject: [config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [config_1.ConfigModule],
                useFactory: graphql_config_1.getGraphglConfig,
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            account_module_1.AccountModule,
            session_module_1.SessionModule,
            nlp_module_1.NlpModule,
            product_module_1.ProductModule,
            review_module_1.ReviewModule,
            order_module_1.OrderModule,
            file_module_1.FileModule,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map