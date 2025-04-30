import { User } from 'prisma/generated';
import { AccountService } from './account.service';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateRoleInput } from './inputs/update-role-input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { AddToViewedInput } from './inputs/add-to-viewed.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    me(id: string): Promise<{
        cart: ({
            product: {
                id: string;
                createdAt: Date;
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
            id: string;
            userId: string;
            productId: string;
        })[];
        reviews: ({
            user: {
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
                createdAt: Date;
                updatedAt: Date;
            };
            product: {
                id: string;
                createdAt: Date;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            productId: string | null;
            text: string;
            rating: number;
        })[];
        orders: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string | null;
                price: number;
                orderId: string | null;
                quantity: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            orderId: string;
            status: import("prisma/generated").$Enums.EnumOrderStatus;
            total: number;
        })[];
    } & {
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
        createdAt: Date;
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
    addToViewed(input: AddToViewedInput): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
