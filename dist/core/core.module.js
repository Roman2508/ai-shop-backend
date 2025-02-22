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
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const prisma_module_1 = require("./prisma/prisma.module");
const is_dev_util_1 = require("../shared/util/is-dev.util");
const apollo_1 = require("@nestjs/apollo");
const graphql_2 = require("./config/graphql");
const langchain_module_1 = require("../langchain/langchain.module");
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
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [config_1.ConfigModule],
                useFactory: graphql_2.getGraphglConfig,
                inject: [config_1.ConfigService],
            }),
            langchain_module_1.LangchainModule,
            prisma_module_1.PrismaModule,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map