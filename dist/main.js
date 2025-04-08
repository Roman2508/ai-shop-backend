"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express = require("express");
const core_1 = require("@nestjs/core");
const session = require("express-session");
const connect_redis_1 = require("connect-redis");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const core_module_1 = require("./core/core.module");
const ms_util_1 = require("./shared/utils/ms.util");
const redis_service_1 = require("./core/redis/redis.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(core_module_1.CoreModule);
    const config = app.get(config_1.ConfigService);
    const redis = app.get(redis_service_1.RedisService);
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', true);
    app.use(cookieParser(config.getOrThrow('COOKIES_SECRET')));
    app.use(graphqlUploadExpress());
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: (0, ms_util_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            secure: config.getOrThrow('NODE_ENV') === 'development' ? false : true,
            sameSite: config.getOrThrow('NODE_ENV') === 'development' ? 'lax' : 'none',
            httpOnly: config.getOrThrow('NODE_ENV') === 'development' ? false : false,
        },
        store: new connect_redis_1.RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_FOLDER'),
        }),
    }));
    app.enableCors({
        origin: config
            .getOrThrow('ALLOWED_ORIGIN')
            .split(',')
            .map((origin) => origin.trim()),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });
    await app.listen(config.getOrThrow('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map