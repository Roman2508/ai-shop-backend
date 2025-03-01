import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from 'prisma/generated';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
    }[]>;
    me(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleFavorite(userId: string, productId: string): Promise<boolean>;
}
