export declare class CreateOrderInput {
    userId: string;
    items: OrderItemDto[];
}
export declare class OrderItemDto {
    quantity: number;
    price: number;
    productId: string;
}
