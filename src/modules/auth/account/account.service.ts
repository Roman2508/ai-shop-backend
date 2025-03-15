import { hash, verify } from 'argon2';
import { User } from 'prisma/generated';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { FileService } from 'src/modules/file/file.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async me(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        cart: { include: { product: true } },
        favorites: { include: { product: true } },
        orders: true,
      },
    });
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

  async toggleCart(userId: string, input: AddToCartInput) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      include: { cart: { include: { product: true } } },
    });

    if (!user) {
      throw new Error('Користувача не знайдено');
    }

    const isExists = user.cart.some((product) => product.productId === input.productId);

    if (!isExists) {
      await this.prismaService.cartItem.create({
        data: {
          userId: userId,
          productId: input.productId,
          count: input.count,
        },
      });
    } else {
      await this.prismaService.cartItem.delete({
        where: {
          userId_productId: {
            userId: userId,
            productId: input.productId,
          },
        },
      });
    }

    return true;
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user) {
      throw new Error('Користувача не знайдено');
    }

    const isFavorite = user.favorites.some((favorite) => favorite.productId === productId);

    if (!isFavorite) {
      await this.prismaService.favoriteItem.create({
        data: {
          userId: userId,
          productId: productId,
        },
      });
    } else {
      await this.prismaService.favoriteItem.delete({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
      });
    }

    return true;
  }

  async updateUserData(id: string, user: UpdateUserInput) {
    const { password, ...data } = user;

    const passObj = password ? { password: await hash(password) } : {};

    await this.prismaService.user.update({
      where: { id },
      data: { ...data, ...passObj },
    });

    return true;
  }

  async uploadAvatar(id: string, file: any) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    if (user.avatar) {
      await this.fileService.removeFile(user.avatar, 'users');
    }

    const filename = await this.fileService.upload(file, 'users');
    await this.prismaService.user.update({ where: { id }, data: { avatar: filename } });
    return true;
  }

  async changeCartItemCount(input: ChangeCartItemCountInput) {
    await this.prismaService.cartItem.update({
      where: { id: input.id },
      data: { count: input.count },
    });

    return true;
  }
}
