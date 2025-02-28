import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
export declare class AccountService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
