import { ReviewService } from './review.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getByUserId(userId: string): Promise<({
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
    })[]>;
    getAverage(): Promise<string>;
    create(userId: string, input: CreateReviewInput): Promise<boolean>;
    delete(userId: string, id: string): Promise<boolean>;
}
