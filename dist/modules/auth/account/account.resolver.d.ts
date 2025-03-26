import { User } from 'prisma/generated';
import { AccountService } from './account.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
import { UpdateRoleInput } from './inputs/update-role-input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<{
        createdAt: Date;
        id: string;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
        city: string | null;
        street: string | null;
        postOffice: string | null;
        role: import("prisma/generated").$Enums.EnumUserRoles;
        viewedProducts: string[];
        updatedAt: Date;
    }[]>;
    me(id: string): Promise<{
        cart: ({
            product: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
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
            };
        } & {
            userId: string;
            id: string;
            productId: string;
            count: number;
        })[];
        favorites: ({
            product: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
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
            };
        } & {
            userId: string;
            id: string;
            productId: string;
        })[];
        reviews: ({
            user: {
                createdAt: Date;
                id: string;
                email: string;
                password: string;
                username: string;
                displayName: string;
                avatar: string | null;
                city: string | null;
                street: string | null;
                postOffice: string | null;
                role: import("prisma/generated").$Enums.EnumUserRoles;
                viewedProducts: string[];
                updatedAt: Date;
            };
            product: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
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
            };
        } & {
            userId: string | null;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            productId: string | null;
            text: string;
            rating: number;
        })[];
        orders: ({
            items: ({
                product: {
                    createdAt: Date;
                    id: string;
                    updatedAt: Date;
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
                };
            } & {
                createdAt: Date;
                id: string;
                updatedAt: Date;
                productId: string | null;
                price: number;
                orderId: string | null;
                quantity: number;
            })[];
        } & {
            userId: string | null;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            orderId: string;
            status: import("prisma/generated").$Enums.EnumOrderStatus;
            total: number;
        })[];
    } & {
        createdAt: Date;
        id: string;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
        city: string | null;
        street: string | null;
        postOffice: string | null;
        role: import("prisma/generated").$Enums.EnumUserRoles;
        viewedProducts: string[];
        updatedAt: Date;
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleCart(id: string, input: AddToCartInput): Promise<boolean>;
    toggleFavorite(id: string, productId: string): Promise<boolean>;
    updateUserData(id: string, input: UpdateUserInput): Promise<boolean>;
    updateRole(id: string, input: UpdateRoleInput): Promise<boolean>;
    uploadAvatar(userId: string, file: any): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
