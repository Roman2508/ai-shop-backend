import { hash, verify } from 'argon2';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { User, Product } from 'prisma/generated';
import { ChangePasswordInput } from './inputs/change-password.input';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async me(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  async create(input: CreateUserInput) {
    const { email, password, username } = input;

    const isUsernameExist = await this.prismaService.user.findUnique({ where: { username } });

    if (isUsernameExist) {
      throw new ConflictException("Це ім'я вже зайнято");
    }

    const isEmailExist = await this.prismaService.user.findUnique({ where: { email } });

    if (isEmailExist) {
      throw new ConflictException('Ця пошта вже зареєстрована');
    }

    await this.prismaService.user.create({
      data: { email, username, password: await hash(password), displayName: username },
    });

    return true;
  }

  async changeEmail(user: User, input: ChangeEmailInput) {
    const { email } = input;

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { email },
    });

    return true;
  }

  async changePassword(user: User, input: ChangePasswordInput) {
    const { oldPassword, newPassword } = input;

    const isValidPassword = await verify(user.password, oldPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Паролі не співпадають');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: await hash(newPassword) },
    });

    return true;
  }

  async toggleFavorite(productId: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user) {
      throw new Error('Користувача не знайдено');
    }

    const isExists = user.favorites.some((product) => product.id === productId);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });

    return true;
  }
}
