import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewService {
    private readonly prismaService;
    private readonly productService;
    constructor(prismaService: PrismaService, productService: ProductService);
    getByUserId(userId: string): Promise<({
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
    })[]>;
    getAverage(): Promise<string>;
    create(userId: string, input: CreateReviewInput): Promise<boolean>;
    delete(userId: string, id: string): Promise<boolean>;
}
