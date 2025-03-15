import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from 'prisma/generated';
import { UserModel } from './models/user.model';
import { AccountService } from './account.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { ChangePasswordInput } from './inputs/change-password.input';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';

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
  @Mutation(() => Boolean, { name: 'toggleCart' })
  async toggleCart(@Authorized('id') id: string, @Args('input') input: AddToCartInput) {
    return this.accountService.toggleCart(id, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'toggleFavorite' })
  async toggleFavorite(@Authorized('id') id: string, @Args('productId') productId: string) {
    return this.accountService.toggleFavorite(id, productId);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateUserData' })
  async updateUserData(@Authorized('id') id: string, @Args('user') input: UpdateUserInput) {
    return this.accountService.updateUserData(id, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'uploadAvatar' })
  async uploadAvatar(@Authorized('id') userId: string, @Args({ name: 'file', type: () => GraphQLUpload }) file: any) {
    return this.accountService.uploadAvatar(userId, file);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeCartItemCount' })
  async changeCartItemCount(@Args('input') input: ChangeCartItemCountInput) {
    return this.accountService.changeCartItemCount(input);
  }
}
