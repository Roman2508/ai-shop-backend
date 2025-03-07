import { ReviewService } from './review.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(userId: string, input: CreateReviewInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        text: string;
        rating: number;
        productId: string | null;
    }>;
    delete(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        text: string;
        rating: number;
        productId: string | null;
    }>;
}
