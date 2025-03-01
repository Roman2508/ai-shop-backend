import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { User } from 'prisma/generated';
import { ChangePasswordInput } from './inputs/change-password.input';
export declare class AccountService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    toggleFavorite(productId: string, userId: string): Promise<boolean>;
}
