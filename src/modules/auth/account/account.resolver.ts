import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserModel } from './models/user.model';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { User } from 'prisma/generated';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  /* Метод не используется (возможно понадобится позже для изменения ролей администраторам) */
  @Query(() => [UserModel], { name: 'findAllUsers' })
  async findAll() {
    return this.accountService.findAll();
  }

  @Authorization()
  @Query(() => UserModel, { name: 'findProfile' })
  async me(@Authorized('id') id: string) {
    return this.accountService.me(id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeEmail' })
  async changeEmail(@Authorized() user: User, @Args('data') input: ChangeEmailInput) {
    return this.accountService.changeEmail(user, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changePassword' })
  async changePassword(@Authorized() user: User, @Args('data') input: ChangePasswordInput) {
    return this.accountService.changePassword(user, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'toggleFavorite' })
  async toggleFavorite(@Authorized('id') userId: string, @Args('data') productId: string) {
    return this.accountService.toggleFavorite(productId, userId);
  }
}
