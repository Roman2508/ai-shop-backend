import { join } from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { CoreModule } from './core/core.module';
import { ms, StringValue } from './shared/utils/ms.util';
import { RedisService } from './core/redis/redis.service';
import { parseBoolean } from './shared/utils/parse-boolean.util';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const config = app.get(ConfigService);
  const redis = app.get(RedisService);

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));
  app.use(graphqlUploadExpress());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        secure: config.getOrThrow<string>('NODE_ENV') === 'development' ? false : true,
        sameSite: config.getOrThrow<string>('NODE_ENV') === 'development' ? 'lax' : 'none',
        httpOnly: config.getOrThrow<string>('NODE_ENV') === 'development' ? false : false,

        // maxAge: 1000 * 60 * 60 * 24 * 30,
        // httpOnly: true,
        // secure: true,
        // sameSite: 'none',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  app.enableCors({
    origin: config
      .getOrThrow<string>('ALLOWED_ORIGIN')
      .split(',')
      .map((origin) => origin.trim()),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(config.getOrThrow<number>('PORT'));
}
bootstrap();
