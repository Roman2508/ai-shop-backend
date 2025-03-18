import { Review } from 'prisma/generated';
import { UserModel } from 'src/modules/auth/account/models/user.model';
import { ProductModel } from 'src/modules/product/models/product.model';
export declare class ReviewModel implements Review {
    id: string;
    text: string;
    rating: number;
    user: UserModel;
    userId: string;
    product: ProductModel;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}
