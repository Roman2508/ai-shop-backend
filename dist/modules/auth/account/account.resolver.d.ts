import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        displayName: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(input: CreateUserInput): Promise<boolean>;
}
