import { OrderModel } from './order.model';
import { OrderItem } from 'prisma/generated';
import { ProductModel } from 'src/modules/product/models/product.model';
export declare class OrderItemModel implements OrderItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    price: number;
    order: OrderModel;
    orderId: string;
    product: ProductModel;
    productId: string;
}
