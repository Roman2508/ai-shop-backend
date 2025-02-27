import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInput } from './inputs/login.input';
import { SessionService } from './session.service';
import { UserModel } from '../account/models/user.model';
import { GqlContext } from 'src/shared/types/gql-context.types';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel, { name: 'login' })
  async login(@Context() { req }: GqlContext, @Args('data') input: LoginInput) {
    return this.sessionService.login(req, input);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Context() { req }: GqlContext) {
    return this.sessionService.logout(req);
  }
}
