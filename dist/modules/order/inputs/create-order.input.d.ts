import { EnumOrderStatus } from 'prisma/generated';
export declare class CreateOrderInput {
    status: EnumOrderStatus;
    items: OrderItemDto[];
}
export declare class OrderItemDto {
    quantity: number;
    price: number;
    productId: string;
}
