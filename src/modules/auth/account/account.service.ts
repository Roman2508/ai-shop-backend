import { hash } from 'argon2';
import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
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
}
