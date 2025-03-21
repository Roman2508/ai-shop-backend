export declare class CreateOrderInput {
    orderId: string;
    userId: string;
    items: OrderItemDto[];
}
export declare class OrderItemDto {
    quantity: number;
    price: number;
    productId: string;
}
