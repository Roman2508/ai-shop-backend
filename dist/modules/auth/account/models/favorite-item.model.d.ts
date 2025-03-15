import { UserModel } from './user.model';
import { FavoriteItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';
export declare class FavoriteItemModel implements FavoriteItem {
    id: string;
    user: UserModel;
    userId: string;
    product: ProductModel;
    productId: string;
}
