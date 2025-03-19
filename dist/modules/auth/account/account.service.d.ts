import { User } from 'prisma/generated';
import { FileService } from 'src/modules/file/file.service';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
export declare class AccountService {
    private readonly prismaService;
    private readonly fileService;
    constructor(prismaService: PrismaService, fileService: FileService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        password: string;
        displayName: string;
        avatar: string | null;
        city: string | null;
        street: string | null;
        postOffice: string | null;
    }[]>;
    me(id: string): Promise<{
        cart: ({
            product: {
                price: number;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                images: string[];
                title: string;
                brand: string;
                ram: number;
                builtInMemory: number;
                color: string;
                frontCamera: number;
                mainCamera: number;
                screenDiagonal: number;
                simCount: number;
                simFormat: string[];
                os: string;
                processorName: string;
                processorCores: string;
                battery: number;
                materials: string;
                deliverySet: string;
            };
        } & {
            productId: string;
            id: string;
            userId: string;
            count: number;
        })[];
        favorites: ({
            product: {
                price: number;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                images: string[];
                title: string;
                brand: string;
                ram: number;
                builtInMemory: number;
                color: string;
                frontCamera: number;
                mainCamera: number;
                screenDiagonal: number;
                simCount: number;
                simFormat: string[];
                os: string;
                processorName: string;
                processorCores: string;
                battery: number;
                materials: string;
                deliverySet: string;
            };
        } & {
            productId: string;
            id: string;
            userId: string;
        })[];
        reviews: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                username: string;
                password: string;
                displayName: string;
                avatar: string | null;
                city: string | null;
                street: string | null;
                postOffice: string | null;
            };
            product: {
                price: number;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                images: string[];
                title: string;
                brand: string;
                ram: number;
                builtInMemory: number;
                color: string;
                frontCamera: number;
                mainCamera: number;
                screenDiagonal: number;
                simCount: number;
                simFormat: string[];
                os: string;
                processorName: string;
                processorCores: string;
                battery: number;
                materials: string;
                deliverySet: string;
            };
        } & {
            text: string;
            productId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            rating: number;
        })[];
        orders: {
            status: import("prisma/generated").$Enums.EnumOrderStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            userId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        password: string;
        displayName: string;
        avatar: string | null;
        city: string | null;
        street: string | null;
        postOffice: string | null;
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleCart(userId: string, input: AddToCartInput): Promise<boolean>;
    toggleFavorite(userId: string, productId: string): Promise<boolean>;
    updateUserData(id: string, user: UpdateUserInput): Promise<boolean>;
    uploadAvatar(id: string, file: any): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
