import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserModel } from './models/user.model';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  /* Метод не используется (возможно понадобится позже для изменения ролей администраторам) */
  @Query(() => [UserModel], { name: 'findAllUsers' })
  async findAll() {
    return this.accountService.findAll();
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }
}
