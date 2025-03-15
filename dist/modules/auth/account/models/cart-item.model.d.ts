import { UserModel } from './user.model';
import { CartItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';
export declare class CartItemModel implements CartItem {
    id: string;
    count: number;
    user: UserModel;
    userId: string;
    product: ProductModel;
    productId: string;
}
