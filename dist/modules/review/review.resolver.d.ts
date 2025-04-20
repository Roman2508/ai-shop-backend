import { ReviewService } from './review.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getByUserId(userId: string): Promise<({
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
            role: import("prisma/generated").$Enums.EnumUserRoles;
            viewedProducts: string[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        rating: number;
        userId: string | null;
        productId: string | null;
    })[]>;
    getAverage(): Promise<string>;
    create(userId: string, input: CreateReviewInput): Promise<boolean>;
    delete(userId: string, id: string): Promise<boolean>;
}
