import { ReviewService } from './review.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getByUserId(userId: string): Promise<({
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
    })[]>;
    create(userId: string, input: CreateReviewInput): Promise<boolean>;
    delete(userId: string, id: string): Promise<boolean>;
}
