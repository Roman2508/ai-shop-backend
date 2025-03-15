import { Review } from 'prisma/generated';
export declare class ReviewModel implements Review {
    id: string;
    text: string;
    rating: number;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}
