import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from './../../core/prisma/prisma.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const id = request.session.userId;

    if (typeof id === 'undefined') {
      throw new UnauthorizedException('Користувач не авторизований');
    }

    const user = await this.prismaService.user.findUnique({ where: { id } });

    request.user = user;

    return true;
  }
}
