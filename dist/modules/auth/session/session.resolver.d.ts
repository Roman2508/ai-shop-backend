import { LoginInput } from './inputs/login.input';
import { SessionService } from './session.service';
import { GqlContext } from 'src/shared/types/gql-context.types';
export declare class SessionResolver {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    findByUser({ req }: GqlContext): Promise<any[]>;
    findCurrent({ req }: GqlContext): Promise<any>;
    login({ req }: GqlContext, input: LoginInput, userAgent: string): Promise<unknown>;
    logout({ req }: GqlContext): Promise<unknown>;
    clearSession({ req }: GqlContext): Promise<boolean>;
    remove({ req }: GqlContext, id: string): Promise<boolean>;
}
