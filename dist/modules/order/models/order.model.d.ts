import { OrderItemModel } from './order-item.model';
import { EnumOrderStatus, Order } from 'prisma/generated';
import { UserModel } from 'src/modules/auth/account/models/user.model';
export declare class OrderModel implements Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: EnumOrderStatus;
    items: OrderItemModel[];
    total: number;
    user: UserModel;
    userId: string;
}
