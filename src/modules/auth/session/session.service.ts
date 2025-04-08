import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { verify } from 'argon2';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { Response } from 'express';
import { LoginInput } from './inputs/login.input';
import { RedisService } from 'src/core/redis/redis.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { ms, StringValue } from 'src/shared/utils/ms.util';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async findByUser(req: Request) {
    const userId = (req as any).session.userId;

    if (!userId) {
      throw new NotFoundException('Користувач не знайдений в сессии');
    }

    const keys = await this.redisService.keys('*');

    const userSessions = [];

    for (const key of keys) {
      const sessionData = await this.redisService.get(key);

      if (sessionData) {
        const session = JSON.parse(sessionData);

        if (session.userId === userId) {
          userSessions.push({
            ...session,
            id: key.split(':')[1],
          });
        }
      }
    }

    userSessions.sort((a, b) => b.createdAt - a.createdAt);

    return userSessions.filter((session) => session.id !== (req as any).session.id);
  }

  async findCurrent(req: Request) {
    const sessionId = (req as any).session.id;

    const sessionData = await this.redisService.get(
      `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`,
    );

    const session = JSON.parse(sessionData);

    return {
      ...session,
      id: sessionId,
    };
  }

  async login(req: Request, input: LoginInput, userAgent: string, res: Response) {
    const { login, password } = input;

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
    });

    // res.setHeader('Set-Cookie', 'token=abc; Path=/; Secure; SameSite=None');

    if (!user) {
      throw new NotFoundException('Користувач не знайдений');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Пароль не вірний');
    }

    const metadata = getSessionMetadata(req, userAgent);

    // const sessionData = { createdAt: new Date(), userId: user.id, metadata };
    // const SESSION_NAME = this.configService.getOrThrow<string>('SESSION_NAME');
    // res.setHeader('Set-Cookie', `${SESSION_NAME}=${JSON.stringify(sessionData)}; Path=/; Secure; SameSite=None`);

    // return user;

    res.cookie('isAuth', '1', {
      // httpOnly: false,
      // sameSite: 'none',
      // secure: true,
      // maxAge: 60 * 60 * 1000,
      maxAge: ms(this.configService.getOrThrow<StringValue>('SESSION_MAX_AGE')),
      secure: this.configService.getOrThrow<string>('NODE_ENV') === 'development' ? false : true,
      sameSite: this.configService.getOrThrow<string>('NODE_ENV') === 'development' ? 'lax' : 'none',
      httpOnly: this.configService.getOrThrow<string>('NODE_ENV') === 'development' ? false : false,
    });

    return new Promise((resolve, reject) => {
      (req as any).session.createdAt = new Date();
      (req as any).session.userId = user.id;
      (req as any).session.metadata = metadata;

      (req as any).session.save((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Не вдалось зберегти сесію'));
        }

        resolve(user);
      });
    });
  }

  async logout(req: Request) {
    return new Promise((resolve, reject) => {
      (req as any).session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Не вдалось завершити сесію'));
        }

        const sessionName = this.configService.getOrThrow<string>('SESSION_NAME');
        req.res.clearCookie(sessionName);
        resolve(true);
      });
    });
  }

  async clearSession(req: Request) {
    req.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));

    return true;
  }

  async remove(req: Request, id: string) {
    if ((req as any).session.id === id) {
      throw new ConflictException('Поточну сесію видалити не можливо');
    }

    await this.redisService.del(`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`);

    return true;
  }
}
