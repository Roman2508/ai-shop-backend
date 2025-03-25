import { User } from 'prisma/generated';
import { FileService } from 'src/modules/file/file.service';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ChangeCartItemCountInput } from './inputs/change-cart-item-count.input';
import { UpdateRoleInput } from './inputs/update-role-input';
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
        role: import("prisma/generated").$Enums.EnumUserRoles;
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
            userId: string;
            productId: string;
            id: string;
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
            userId: string;
            productId: string;
            id: string;
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
            userId: string | null;
            productId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
        })[];
        orders: ({
            items: ({
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
                orderId: string | null;
                quantity: number;
                price: number;
                productId: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            })[];
        } & {
            orderId: string;
            userId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("prisma/generated").$Enums.EnumOrderStatus;
            total: number;
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
    }>;
    create(input: CreateUserInput): Promise<boolean>;
    changeEmail(user: User, input: ChangeEmailInput): Promise<boolean>;
    changePassword(user: User, input: ChangePasswordInput): Promise<boolean>;
    toggleCart(userId: string, input: AddToCartInput): Promise<boolean>;
    toggleFavorite(userId: string, productId: string): Promise<boolean>;
    updateUserData(id: string, user: UpdateUserInput): Promise<boolean>;
    updateRole(id: string, input: UpdateRoleInput): Promise<boolean>;
    uploadAvatar(id: string, file: any): Promise<boolean>;
    changeCartItemCount(input: ChangeCartItemCountInput): Promise<boolean>;
}
