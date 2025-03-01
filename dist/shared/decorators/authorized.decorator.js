"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
exports.Authorized = (0, common_1.createParamDecorator)((data, ctx) => {
    let user;
    if (ctx.getType() === 'http') {
        user = ctx.switchToHttp().getRequest().user;
    }
    else {
        const context = graphql_1.GqlExecutionContext.create(ctx);
        user = context.getContext().req.user;
    }
    return data ? user[data] : data;
});
//# sourceMappingURL=authorized.decorator.js.map