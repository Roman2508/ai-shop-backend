import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewService {
    private readonly prismaService;
    private readonly productService;
    constructor(prismaService: PrismaService, productService: ProductService);
    create(userId: string, input: CreateReviewInput): Promise<{
        text: string;
        productId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        rating: number;
    }>;
    delete(userId: string, id: string): Promise<{
        text: string;
        productId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        rating: number;
    }>;
}
