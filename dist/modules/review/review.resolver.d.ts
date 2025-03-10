import { ReviewService } from './review.service';
import { CreateReviewInput } from './inputs/create-review.input';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
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
