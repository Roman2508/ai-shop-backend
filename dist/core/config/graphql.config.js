"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphglConfig = void 0;
const path_1 = require("path");
const is_dev_util_1 = require("../../shared/util/is-dev.util");
const getGraphglConfig = (configService) => {
    return {
        playground: (0, is_dev_util_1.isDev)(configService),
        path: configService.getOrThrow('GRAPHQL_PREFIX'),
        autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/core/graphql/schema.gql'),
        sortSchema: true,
        context: ({ req, res }) => ({ req, res }),
    };
};
exports.getGraphglConfig = getGraphglConfig;
//# sourceMappingURL=graphql.config.js.map