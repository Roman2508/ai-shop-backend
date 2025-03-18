import { User } from 'prisma/generated';
import { AccountService } from './account.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
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
        city: string | null;
        street: string | null;
        postOffice: string | null;
    }[]>;
    me(id: string): Promise<{
        reviews: ({
            product: {
                id: string;
                images: string[];
                title: string;
                price: number;
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
                createdAt: Date;
                updatedAt: Date;
            };
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                username: string;
                displayName: string;
                avatar: string | null;
                city: string | null;
                street: string | null;
                postOffice: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            rating: number;
            userId: string | null;
            productId: string | null;
        })[];
        cart: ({
            product: {
                id: string;
                images: string[];
                title: string;
                price: number;
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
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            userId: string;
            productId: string;
            count: number;
        })[];
        favorites: ({
            product: {
                id: string;
                images: string[];
                title: string;
                price: number;
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
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            userId: string;
            productId: string;
        })[];
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            total: number;
            status: import("prisma/generated").$Enums.EnumOrderStatus;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
        city: string | null;
        street: string | null;
        postOffice: string | null;
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleCart(id: string, input: AddToCartInput): Promise<boolean>;
    toggleFavorite(id: string, productId: string): Promise<boolean>;
    updateUserData(id: string, input: UpdateUserInput): Promise<boolean>;
    uploadAvatar(userId: string, file: any): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
