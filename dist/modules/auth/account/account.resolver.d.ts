import { User } from 'prisma/generated';
import { AccountService } from './account.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
import { UpdateRoleInput } from './inputs/update-role-input';
import { AddToViewedInput } from './inputs/add-to-viewed.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
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
        role: import("prisma/generated").$Enums.EnumUserRoles;
        viewedProducts: string[];
    }[]>;
    me(id: string): Promise<{
        cart: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
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
            id: string;
            userId: string;
            productId: string;
            count: number;
        })[];
        favorites: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
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
            id: string;
            userId: string;
            productId: string;
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
                role: import("prisma/generated").$Enums.EnumUserRoles;
                viewedProducts: string[];
            };
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            productId: string | null;
            rating: number;
        })[];
        orders: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                orderId: string | null;
                quantity: number;
                price: number;
                productId: string | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            status: import("prisma/generated").$Enums.EnumOrderStatus;
            total: number;
            userId: string | null;
        })[];
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
        role: import("prisma/generated").$Enums.EnumUserRoles;
        viewedProducts: string[];
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleCart(id: string, input: AddToCartInput): Promise<boolean>;
    toggleFavorite(id: string, productId: string): Promise<boolean>;
    updateUserData(id: string, input: UpdateUserInput): Promise<boolean>;
    updateRole(id: string, input: UpdateRoleInput): Promise<boolean>;
    uploadAvatar(userId: string, file: any): Promise<boolean>;
    addToViewed(input: AddToViewedInput): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
