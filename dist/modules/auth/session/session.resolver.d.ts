import { LoginInput } from './inputs/login.input';
import { SessionService } from './session.service';
import { GqlContext } from 'src/shared/types/gql-context.types';
export declare class SessionResolver {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    login({ req }: GqlContext, input: LoginInput): Promise<unknown>;
    logout({ req }: GqlContext): Promise<unknown>;
}
