import { CartItemModel } from './cart-item.model';
import { EnumUserRoles, User } from 'prisma/generated';
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
    role: EnumUserRoles;
    favorites: FavoriteItemModel[];
    cart: CartItemModel[];
    orders: OrderModel[];
    reviews: ReviewModel[];
    viewedProducts: string[];
    createdAt: Date;
    updatedAt: Date;
}
