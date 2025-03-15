import { User } from 'prisma/generated';
import { CartItemModel } from './cart-item.model';
import { FavoriteItemModel } from './favorite-item.model';
import { OrderModel } from 'src/modules/order/models/order.model';
import { ReviewModel } from 'src/modules/review/models/review.model';
export declare class UserModel implements User {
    id: string;
    email: string;
    password: string;
    username: string;
    displayName: string;
    avatar: string;
    city: string;
    street: string;
    postOffice: string;
    favorites: FavoriteItemModel[];
    cart: CartItemModel[];
    orders: OrderModel[];
    reviews: ReviewModel[];
    createdAt: Date;
    updatedAt: Date;
}
